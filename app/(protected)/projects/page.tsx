import { getProjects } from "@/actions/projects/projects";
import Link from "next/link";
import styles from "@/app/general.module.css";

export default async function Projects() {
  const projects = await getProjects();
  return (
    <div className={styles.mainWrapper}>
      <h1>Projects</h1>
      <div className="">
        <Link className={styles.aButton} href="/projects/create">
          Create Project
        </Link>
      </div>
      <div>
        {projects.map((project) => (
          <Link
            className={styles.projectLink}
            href={`/project/${project.id}`}
            key={project.id}
          >
            {project.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
