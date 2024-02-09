import { Navbar } from "./_components/navbar";
import styles from "./styles.module.css";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <main className={styles.mainWrapper}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>{children}</div>
      <div className={styles.footer}>footer</div>
    </main>
  );
};

export default ProtectedLayout;
