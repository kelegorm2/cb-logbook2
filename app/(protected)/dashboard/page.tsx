import { currentUser } from "@/lib/auth";
import styles from "./styles.module.css";
import {
  getMostActiveProjects,
  getMostActiveUsers,
  getMostUseTags,
  getLastLogEntries,
} from "@/actions/dashboard/dashboard";

const ClientPage = async () => {
  const user = await currentUser();
  const mostActiveProjects = await getMostActiveProjects();
  const mostActiveUsers = await getMostActiveUsers();
  const mostUseTags = await getMostUseTags();
  const lastLogEntries = await getLastLogEntries();

  return (
    <div className={styles.mainWrapper}>
      <h1>Dashboard</h1>
      <div className={styles.dashboardContainer}>
        <div className={styles.aCard}>
          <h2>Most Active Projects</h2>
          <div>
            {Object.values(mostActiveProjects).map((project) => (
              <p key={project.id}>
                {project.name} - {project.count}
              </p>
            ))}
          </div>
        </div>

        <div className={styles.aCard}>
          <h2>Most Active Users</h2>
          <div>
            {Object.values(mostActiveUsers).map((user) => (
              <p key={user.id}>
                {user.name} - {user.count}
              </p>
            ))}
          </div>
        </div>

        <div className={styles.aCard}>
          <h2>Most Used Tags</h2>
          <div>
            {Object.values(mostUseTags).map((tag) => (
              <p key={tag.id}>
                {tag.name} - {tag.count}
              </p>
            ))}
          </div>
        </div>

        <div className={styles.aCard}>
          <h2>Last Log Entries</h2>
          <div>
            {lastLogEntries.map((log) => (
              <p key={log.id}>
                {log.description.substring(0, 100)} - {log.user.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
