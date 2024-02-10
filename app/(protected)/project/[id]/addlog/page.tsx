import { getTags } from "@/actions/tags/tags";
import AddLogForm from "@/components/log/AddLogForm";
import styles from "@/app/general.module.css";

type pageProps = {
  params: {
    id: string;
  };
};

export default async function addLog({ params }: pageProps) {
  const tags = await getTags();
  return (
    <div className={styles.mainWrapper}>
      <h1>Add Log</h1>
      <AddLogForm tags={tags} projectId={params.id} />
    </div>
  );
}
