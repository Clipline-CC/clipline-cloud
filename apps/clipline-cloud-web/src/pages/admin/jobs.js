import { html } from "../../lib/html.js";
import { useState } from "preact/hooks";
import { formatBytes, formatDate } from "../../lib/format.js";
import { api, ApiError } from "../../lib/api.js";
import { toast } from "../../lib/store.js";
import { icon } from "../../lib/icons.js";
import { ConfirmDialog } from "../../components/ConfirmDialog.js";

// Job progress is represented as basis points by the API.
function formatProgress(basisPoints) {
  return `${(basisPoints / 100).toFixed(basisPoints % 100 === 0 ? 0 : 1)}%`;
}

// Human guidance for the server's recovery-action enum.
function recoveryActionLabel(action) {
  switch (action) {
    case "delete_and_retry":
      return "delete the failed upload and retry from a new session";
    case "retry":
      return "retry the current upload request";
    default:
      return "";
  }
}

function UploadItem({ upload }) {
  const progress = Math.max(0, Math.min(10000, Number(upload.progress_basis_points || 0)));
  const action = recoveryActionLabel(upload.recovery_action);
  return html`<div class="job-item">
    <div class="job-title-line">
      <strong class="mono">${upload.id}</strong>
      <span class="badge badge-warn">${formatProgress(progress)}</span>
    </div>
    <div class="progress-meter" aria-label="Upload progress"><span style=${`width:${progress / 100}%`}></span></div>
    <span class="muted">clip ${upload.clip_id} — ${formatBytes(upload.received_size_bytes)} of ${formatBytes(upload.expected_size_bytes)} — updated ${formatDate(upload.updated_at)}</span>
    ${upload.failure_reason && html`<span class="form-error">${upload.failure_reason}</span>`}
    ${action && html`<span class="muted">Recovery: ${action}</span>`}
  </div>`;
}

function JobItem({ job }) {
  return html`<div class="job-item">
    <strong>${job.kind} <span class="mono">${job.id}</span></strong>
    <span class="muted">${job.status} — attempts ${job.attempts}/${job.max_attempts} — updated ${formatDate(job.updated_at)} — target ${job.target_type || ""}:${job.target_id || ""}</span>
    ${job.last_error && html`<span class="form-error">${job.last_error}</span>`}
  </div>`;
}

export function JobPanel({ title, items, renderItem, emptyLabel, action }) {
  return html`<div class="panel">
    <div class="section-header">
      <h2>${title}</h2>
      <span class="muted">${items.length}</span>
      ${action}
    </div>
    ${items.length
      ? html`<div class="job-list">${items.map(renderItem)}</div>`
      : html`<p class="muted">${emptyLabel}</p>`}
  </div>`;
}

export function AdminJobs({ failedUploads, deadJobs, recentErrors, reload }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const clearErrors = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const result = await api("/api/v1/admin/jobs/recent-errors", { method: "DELETE" });
      const parts = [];
      if (result.terminal_jobs_deleted > 0) {
        parts.push(`${result.terminal_jobs_deleted} terminal job${result.terminal_jobs_deleted === 1 ? "" : "s"} removed`);
      }
      if (result.errors_cleared > 0) {
        parts.push(`${result.errors_cleared} error${result.errors_cleared === 1 ? "" : "s"} cleared`);
      }
      toast(parts.length ? `${parts.join(", ")}.` : "No job errors to clear.");
      reload();
    } catch (err) {
      toast(err instanceof ApiError ? err.message : "Couldn't clear job errors.");
    } finally {
      setBusy(false);
      setConfirmOpen(false);
    }
  };

  const clearAction = (items) =>
    items.length
      ? html`<button class="btn btn-danger" type="button" disabled=${busy}
          onClick=${() => setConfirmOpen(true)}>${icon("trash", { size: 14 })} Clear errors</button>`
      : null;

  // Jobs are otherwise read-only here because the server exposes diagnostics,
  // not a retry mutation endpoint.
  return html`<div class="section">
    <${JobPanel} title="Failed uploads" items=${failedUploads} emptyLabel="No failed uploads."
      renderItem=${(upload) => html`<${UploadItem} key=${upload.id} upload=${upload} />`} />
    <${JobPanel} title="Dead jobs" items=${deadJobs} emptyLabel="No dead jobs."
      action=${clearAction(deadJobs)}
      renderItem=${(job) => html`<${JobItem} key=${job.id} job=${job} />`} />
    <${JobPanel} title="Recent job errors" items=${recentErrors} emptyLabel="No recent job errors."
      action=${clearAction(recentErrors)}
      renderItem=${(job) => html`<${JobItem} key=${job.id} job=${job} />`} />
    <${ConfirmDialog} open=${confirmOpen} title="Clear job errors?"
      body="Dead jobs are removed and error messages are cleared from the diagnostics lists. Clips and jobs that are still retrying are not affected; new failures will reappear."
      confirmLabel="Clear errors" danger confirmDisabled=${busy} onCancel=${() => setConfirmOpen(false)} onConfirm=${clearErrors} />
  </div>`;
}
