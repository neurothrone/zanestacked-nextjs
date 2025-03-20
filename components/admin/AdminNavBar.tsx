import Link from "next/link";
import styles from "@/components/admin/AdminNavBar.module.css";

const AdminNavBar = () => {
  return (
    <div>
      <Link href="/" className={styles.customLink}>Home</Link>
      <Link href="/admin" className={styles.customLink}>Dashboard</Link>
      <Link href="/admin/projects" className={styles.customLink}>Projects</Link>
      <Link href="/admin/skills" className={styles.customLink}>Skills</Link>
      <Link href="/admin/settings" className={styles.customLink}>Settings</Link>
    </div>
  );
};

export default AdminNavBar;
