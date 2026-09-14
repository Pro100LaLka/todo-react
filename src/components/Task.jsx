import styles from "./TaskList.module.css";

function Task({
  id,
  isComplete,
  title,
  description,
  priority,
  onToggle,
  onPriorityToggle,
}) {
  return (
    <li className={styles.task}>
      <details>
        <summary>
          <label htmlFor={`toggle-btn-${id}`} className={styles.toggleBtnLabel}>
            <i className={`fa-solid fa-check ${styles.toggleBtnLabelIcon}`}></i>
          </label>
          <input
            type="checkbox"
            id={`toggle-btn-${id}`}
            className={styles.toggleBtnInput}
            checked={isComplete}
            onChange={() => onToggle(id)}
          />
          <span>{title}</span>
          <button
            className={styles.priorityBtn}
            onClick={() => onPriorityToggle(id)}
            style={{
              color: `var(--color-priority--${priority})`,
            }}
          >
            <i className={`fa-regular fa-flag ${styles.btnIcon}`}></i>
          </button>
          <button className={styles.editBtn}>
            <i className={`fa-solid fa-pencil ${styles.btnIcon}`}></i>
          </button>
          <button className={styles.deleteBtn}>
            <i className={`fa-regular fa-trash-can ${styles.btnIcon}`}></i>
          </button>
        </summary>
        <div className={styles.dropdown}>
          <p className={styles.description}>
            {description || "No description"}
          </p>
          <p className={styles.priority}>{priority || "No"} priority</p>
        </div>
      </details>
    </li>
  );
}

export default Task;
