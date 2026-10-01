-- Match NULL-last ordering and the stable ID tie-breaker used by the default lists.
CREATE INDEX clips_public_uploaded_order_idx
  ON clips((uploaded_at IS NULL) ASC, uploaded_at DESC, id DESC)
  WHERE visibility = 'public' AND status = 'ready'
    AND deleted_at IS NULL AND public_share_id IS NOT NULL;

CREATE INDEX clips_owner_uploaded_order_idx
  ON clips(owner_user_id, (uploaded_at IS NULL) ASC, uploaded_at DESC, id DESC)
  WHERE deleted_at IS NULL AND status <> 'deleted';
