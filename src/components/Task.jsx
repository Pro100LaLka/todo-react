import styles from "./Task.module.css";

function Task({ title, description, priority }) {
  return (
    <li className={styles.task}>
      <details>
        <summary>{title}</summary>
        <p className={styles.description}>{description || "No description"}</p>
        <p className={styles.priority}>{priority || "No"} priority</p>
      </details>
    </li>
  );
}

export default Task;
