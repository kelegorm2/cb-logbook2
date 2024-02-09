import styles from "@/app/general.module.css";
import { currentRole } from "@/lib/auth";

export default async function adminDashboard() {
  const role = await currentRole();
  return (
    <div className={styles.mainWrapper}>
      <h1>Admin Dashboard</h1>
      <p>Admins can see this page</p>
    </div>
  );
}
