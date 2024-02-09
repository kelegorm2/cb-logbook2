import { getLogsFromProjectId, getProjectById } from "@/data/project";
import styles from "@/app/general.module.css";
import Link from "next/link";
import { agoFromDate } from "@/lib/dates";
import SearchBar from "@/components/Search/SearchBar";

type Props = {
  params: {
    id: string;
  };
  searchParams?: {
    query: string;
  };
};

export default async function Project({ params, searchParams }: Props) {
  const query = searchParams?.query || "";
  const project = await getProjectById(params.id);
  const logs = await getLogsFromProjectId(params.id, query);

  return (
    <div className={styles.mainWrapper}>
      <h1>{project?.name}</h1>
      <div>
        <Link className={styles.aButton} href={`/project/${params.id}/addlog`}>
          +Add Log
        </Link>
      </div>
      <h2>Logs</h2>
      <SearchBar />
      <ul>
        {logs?.map((log) => (
          <li key={log.id} className={styles.logStyle}>
            <div className={styles.logDetails}>
              <div>{log.user.name}/</div>
              <div>{agoFromDate(log.created_at)}</div>
              <div>
                {log.tags.map((tag) => (
                  <span key={tag.id} className={styles.tagStyle}>
                    /#{tag.name}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.logDesc}>{log.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
