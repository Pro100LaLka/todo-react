import styles from "./Header.module.css";

function Header({ onAdd }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>My Tasks</h1>
      <button className={styles["add-task"]} onClick={onAdd}>
        <i className="fa-solid fa-plus"></i>
      </button>
    </header>
  );
}

export default Header;
