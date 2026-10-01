import { html } from "../lib/html.js";
import { useCallback, useEffect, useState } from "preact/hooks";
import { api } from "../lib/api.js";
import { navigate } from "../lib/router.js";
import { useAsyncResource } from "../lib/use-api-resource.js";
import { session, toast, useStore } from "../lib/store.js";
import { icon } from "../lib/icons.js";
import { EmptyState } from "../components/EmptyState.js";
import { AdminOverview } from "./admin/overview.js";
import { AdminUsers } from "./admin/users.js";
import { AdminSettings } from "./admin/settings.js";
import { AdminJobs } from "./admin/jobs.js";
import { AdminCategories } from "./admin/categories.js";

const TABS = [
  ["overview", "server", "Overview"],
  ["users", "users", "Users"],
  ["categories", "film", "Game categories"],
  ["settings", "sliders", "Settings"],
  ["jobs", "alert", "Jobs"],
];

export function isAdminLike(user) {
  return user?.role === "admin" || user?.role === "owner";
}

const PANEL_RESOURCES = {
  overview: ["overview", "failedUploads", "deadJobs"],
  users: ["users", "settings"],
  settings: ["settings"],
  categories: ["categories"],
  jobs: ["failedUploads", "deadJobs", "recentErrors"],
};
const RESOURCE_PATHS = {
  overview: "/api/v1/admin/overview", settings: "/api/v1/admin/settings",
  users: "/api/v1/users", categories: "/api/v1/admin/game-categories",
  failedUploads: "/api/v1/admin/uploads/failed?limit=50",
  deadJobs: "/api/v1/admin/jobs/dead?limit=50",
  recentErrors: "/api/v1/admin/jobs/recent-errors?limit=50",
};
export async function loadAdminPanel(tab, signal) {
  const entries = await Promise.all(PANEL_RESOURCES[tab].map(async (name) =>
    [name, await api(RESOURCE_PATHS[name], { signal })]));
  return Object.fromEntries(entries);
}

export function AdminPage({ route }) {
  const { user: currentUser } = useStore(session);
  const canUseAdmin = isAdminLike(currentUser);
  const shouldRedirect = Boolean(currentUser && !canUseAdmin);
  const tab = TABS.some(([key]) => key === route.tab) ? route.tab : "overview";
  const [resetLink, setResetLink] = useState(null);
  const [reloadTick, setReloadTick] = useState(0);
  const [panels, setPanels] = useState({});
  const load = useCallback(async (signal) => {
    if (panels[tab]) return panels[tab];
    const data = await loadAdminPanel(tab, signal);
    if (!signal.aborted) setPanels((current) => ({ ...current, [tab]: data }));
    return data;
  }, [tab, reloadTick]);
  const { data, error } = useAsyncResource(
    canUseAdmin ? `admin:${tab}:${reloadTick}` : null,
    load,
    panels[tab] || null
  );
  const reload = () => {
    // Mutations can affect another panel's summary; invalidate cached panels
    // while immediately fetching only the panel the user is viewing.
    setPanels({});
    setReloadTick((t) => t + 1);
  };

  useEffect(() => {
    if (!shouldRedirect) return;
    toast("Admin access required.");
    navigate("/library");
  }, [shouldRedirect]);

  if (!canUseAdmin) return null;

  return html`<main class="page">
    <h1>Admin</h1>
    <p class="page-subtitle">Accounts, instance summary, and processing diagnostics.</p>
    <nav class="ad-tabs" aria-label="Admin views">
      ${TABS.map(([key, ic, label]) => html`<a key=${key} class=${`ad-tab ${key === tab ? "ad-tab-on" : ""}`}
        href=${key === "categories" ? "/admin/game-categories" : `/admin?tab=${key}`}
        aria-current=${key === tab ? "page" : undefined}>${icon(ic, { size: 14 })} ${label}</a>`)}
    </nav>
    ${error
      ? html`<${EmptyState} name="alert" title="Couldn't load admin data" body=${error.message} />`
      : !data
      ? html`<p class="empty-state">Loading admin data…</p>`
      : tab === "users"
      ? html`<${AdminUsers} users=${data.users} settings=${data.settings} currentUser=${currentUser}
          resetLink=${resetLink} setResetLink=${setResetLink} reload=${reload} />`
      : tab === "settings"
      ? html`<${AdminSettings} settings=${data.settings} isOwner=${currentUser?.role === "owner"} reload=${reload} />`
      : tab === "categories"
      ? html`<${AdminCategories} data=${data.categories} reload=${reload} categoryId=${route.categoryId} />`
      : tab === "jobs"
      ? html`<${AdminJobs} failedUploads=${data.failedUploads} deadJobs=${data.deadJobs} recentErrors=${data.recentErrors} reload=${reload} />`
      : html`<${AdminOverview} overview=${data.overview} deadJobs=${data.deadJobs} failedUploads=${data.failedUploads} />`}
  </main>`;
}
