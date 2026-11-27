import { requireRole } from "@/lib/permissions";
import AdminTab from "@/components/medq/admin/AdminTab";

/**
 * /admin — server-guarded admin console page.
 *
 * Lives inside the (app) route group so it renders within the shared
 * AppShellLayout (sidebar + header). requireRole(["admin"]) enforces the
 * role gate server-side before any admin UI is streamed to the client.
 */
export default async function AdminPage() {
  const session = await requireRole(["admin"]);

  return (
    <AdminTab />
  );
}
