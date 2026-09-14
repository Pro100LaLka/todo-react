import styles from "./Folders.module.css";

function Folders() {
  return (
    <ul className={styles.folderList}>
      <li className={styles.folder}>Personal</li>
      <li className={styles.folder}>Work</li>
      <li className={styles.folder}>Archieve</li>
    </ul>
  );
}

export default Folders;
