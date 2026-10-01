use crate::*;
use chrono::Duration;

async fn backends() -> (tempfile::TempDir, Vec<Database>) {
    let (directory, sqlite) = crate::tests::sqlite_test_database().await;
    let mut databases = vec![sqlite];
    if let Some(postgres) = crate::tests::postgres_test_database().await {
        databases.push(postgres);
    }
    (directory, databases)
}

#[tokio::test]
async fn identities_and_search_share_unicode_case_folding() {
    let (_directory, databases) = backends().await;
    for database in databases {
        let repos = Repositories::new(database);
        let mut owner = NewUser::new("Álice", "hash", "admin");
        owner.email = Some("Example@Clipline.test".into());
        let owner = repos.users.create(&owner).await.unwrap();
        assert_eq!(
            repos
                .users
                .get_by_username("áLICE")
                .await
                .unwrap()
                .unwrap()
                .id,
            owner.id
        );
        assert!(repos
            .users
            .create(&NewUser::new("áLICE", "hash", "user"))
            .await
            .unwrap_err()
            .is_unique_violation());
        let mut duplicate_email = NewUser::new("bob", "hash", "user");
        duplicate_email.email = Some("example@clipline.TEST".into());
        assert!(repos
            .users
            .create(&duplicate_email)
            .await
            .unwrap_err()
            .is_unique_violation());
        repos.ensure_game_category("Über").await.unwrap();
        repos.ensure_game_category("über").await.unwrap();
        assert_eq!(repos.game_categories.list().await.unwrap().len(), 1);
        let mut clip = NewClip::new(&owner.id, "École highlight", "local");
        clip.game_name = Some("Über".into());
        clip.status = "ready".into();
        clip.visibility = "public".into();
        clip.public_share_id = Some("c_unicode_regression".into());
        repos.clips.create(&clip).await.unwrap();
        for query in ["ÉCOLE", "Über", "über"] {
            let found = repos
                .clips
                .list_public(&PublicClipListParams {
                    owner_user_id: None,
                    game: None,
                    game_category_id: None,
                    query: Some(query.into()),
                    sort: ClipSort::TitleAsc,
                    limit: 10,
                    offset: 0,
                })
                .await
                .unwrap();
            assert_eq!(
                found.len(),
                1,
                "{} search on {:?}",
                query,
                repos.users.get(&owner.id).await.unwrap()
            );
        }
    }
}

#[tokio::test]
async fn resets_invites_and_stale_edits_cannot_restore_old_authority() {
    let (_directory, databases) = backends().await;
    for database in databases {
        let repos = Repositories::new(database);
        let mut owner = NewUser::new("owner", "hash", "admin");
        owner.password_change_required = true;
        let owner = repos.users.create(&owner).await.unwrap();
        let expires = now_utc() + Duration::hours(2);
        let first = repos
            .reset_password_tokens
            .create(&NewResetPasswordToken::new(&owner.id, "first", expires))
            .await
            .unwrap();
        let second = repos
            .reset_password_tokens
            .create(&NewResetPasswordToken::new(&owner.id, "second", expires))
            .await
            .unwrap();
        assert!(repos
            .reset_password_tokens
            .get(&first.id)
            .await
            .unwrap()
            .unwrap()
            .used_at
            .is_some());
        repos
            .update_password_and_revoke_credentials(&owner.id, "new-hash")
            .await
            .unwrap();
        assert!(repos
            .reset_password_tokens
            .get(&second.id)
            .await
            .unwrap()
            .unwrap()
            .used_at
            .is_some());
        let owner = repos.users.get(&owner.id).await.unwrap().unwrap();
        assert!(!owner.password_change_required);
        let mut invitation = NewInvitationToken::new("invite", "user", expires);
        invitation.created_by_user_id = Some(owner.id.clone());
        let invitation = repos.invitation_tokens.create(&invitation).await.unwrap();
        let reset = repos
            .reset_password_tokens
            .create(&NewResetPasswordToken::new(&owner.id, "third", expires))
            .await
            .unwrap();
        assert!(repos
            .update_user_if_current(&owner, None, "admin", true, None)
            .await
            .unwrap());
        assert!(!repos
            .update_user_if_current(&owner, Some("stale name"), "admin", false, None)
            .await
            .unwrap());
        let disabled = repos.users.get(&owner.id).await.unwrap().unwrap();
        assert!(disabled.is_disabled);
        assert!(repos
            .update_user_if_current(&disabled, None, "admin", false, None)
            .await
            .unwrap());
        assert!(!repos
            .redeem_reset_password_token(&reset.id, &owner.id, "stolen", now_utc())
            .await
            .unwrap());
        assert!(!repos
            .invitation_tokens
            .claim_if_valid(&invitation.id, "claim", now_utc())
            .await
            .unwrap());
        assert!(!repos
            .redeem_invitation_token(
                &invitation.id,
                "invite",
                &NewUser::new("invited", "hash", "user"),
                now_utc()
            )
            .await
            .unwrap());
    }
}

#[tokio::test]
async fn part_writes_and_terminal_upload_states_are_consistent() {
    let (_directory, databases) = backends().await;
    for database in databases {
        let repos = Repositories::new(database);
        let user = repos
            .users
            .create(&NewUser::new("uploader", "hash", "user"))
            .await
            .unwrap();
        let mut clip = NewClip::new(&user.id, "upload", "local");
        clip.client_clip_id = Some("desktop-id".into());
        let clip = repos.clips.create(&clip).await.unwrap();
        let session = repos
            .upload_sessions
            .create(&NewUploadSession::new(
                &clip.id,
                &user.id,
                10,
                "objects/media/example/source.mp4",
                now_utc() + Duration::hours(1),
            ))
            .await
            .unwrap();
        let (left, right) = tokio::join!(
            repos.upload_parts.claim_write(&session.id, 1, "left"),
            repos.upload_parts.claim_write(&session.id, 1, "right")
        );
        assert_ne!(left.unwrap(), right.unwrap());
        repos
            .upload_parts
            .release_write(&session.id, 1, "unknown")
            .await
            .unwrap();
        assert!(!repos
            .upload_parts
            .claim_write(&session.id, 1, "third")
            .await
            .unwrap());
        repos
            .upload_parts
            .release_write(&session.id, 1, "left")
            .await
            .unwrap();
        repos
            .upload_parts
            .release_write(&session.id, 1, "right")
            .await
            .unwrap();
        assert!(repos
            .upload_parts
            .claim_write(&session.id, 1, "third")
            .await
            .unwrap());
        let mut job = NewJob::new("validate_object", now_utc());
        job.target_type = Some("clip".into());
        job.target_id = Some(clip.id.clone());
        let job = repos.jobs.create(&job).await.unwrap();
        repos
            .jobs
            .claim_next("runner", now_utc(), now_utc() - Duration::minutes(5))
            .await
            .unwrap()
            .unwrap();
        assert!(repos
            .jobs
            .mark_dead_if_locked(&job.id, "runner", 1, "invalid object")
            .await
            .unwrap());
        assert_eq!(
            repos.clips.get(&clip.id).await.unwrap().unwrap().status,
            "failed"
        );
        assert_eq!(
            repos
                .upload_sessions
                .get(&session.id)
                .await
                .unwrap()
                .unwrap()
                .status,
            "failed"
        );
        assert_eq!(
            repos.abort_upload(&session.id, &clip.id).await.unwrap(),
            AbortUploadOutcome::Aborted
        );
        assert!(repos
            .clips
            .get_by_owner_client_clip_id(&user.id, "desktop-id")
            .await
            .unwrap()
            .is_none());
    }
}

#[tokio::test]
async fn jobs_allow_other_owners_to_progress_and_replies_keep_their_parent() {
    let (_directory, databases) = backends().await;
    for database in databases {
        let repos = Repositories::new(database);
        let first = repos
            .users
            .create(&NewUser::new("first", "hash", "user"))
            .await
            .unwrap();
        let second = repos
            .users
            .create(&NewUser::new("second", "hash", "user"))
            .await
            .unwrap();
        let clip = repos
            .clips
            .create(&NewClip::new(&first.id, "clip", "local"))
            .await
            .unwrap();
        for user in [&first, &first, &second] {
            let target = repos
                .clips
                .create(&NewClip::new(&user.id, "job", "local"))
                .await
                .unwrap();
            let mut job = NewJob::new("probe_metadata", now_utc());
            job.target_id = Some(target.id);
            job.target_type = Some("clip".into());
            repos.jobs.create(&job).await.unwrap();
        }
        let now = now_utc() + Duration::seconds(1);
        let stale = now - Duration::minutes(5);
        let first_job = repos
            .jobs
            .claim_next("a", now, stale)
            .await
            .unwrap()
            .unwrap();
        let second_job = repos
            .jobs
            .claim_next("b", now, stale)
            .await
            .unwrap()
            .unwrap();
        let first_owner = repos
            .clips
            .get(first_job.target_id.as_deref().unwrap())
            .await
            .unwrap()
            .unwrap()
            .owner_user_id;
        let second_owner = repos
            .clips
            .get(second_job.target_id.as_deref().unwrap())
            .await
            .unwrap()
            .unwrap()
            .owner_user_id;
        assert_ne!(first_owner, second_owner);
        assert!(repos
            .jobs
            .claim_next("c", now, stale)
            .await
            .unwrap()
            .is_none());
        let parent = repos
            .clip_comments
            .create(&NewClipComment::new(&clip.id, &first.id, "old parent"))
            .await
            .unwrap();
        for index in 0..101 {
            repos
                .clip_comments
                .create(&NewClipComment::new(
                    &clip.id,
                    &first.id,
                    format!("root {index}"),
                ))
                .await
                .unwrap();
        }
        let mut reply = NewClipComment::new(&clip.id, &first.id, "new reply");
        reply.parent_comment_id = Some(parent.id.clone());
        let reply = repos.clip_comments.create(&reply).await.unwrap();
        let comments = repos
            .clip_comments
            .list_for_clip(&clip.id, 100)
            .await
            .unwrap();
        assert!(comments.iter().any(|comment| comment.id == reply.id));
        assert!(comments.iter().any(|comment| comment.id == parent.id));
        assert!(comments.len() <= 200);
    }
}
