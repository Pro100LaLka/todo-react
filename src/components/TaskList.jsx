import Task from "./Task";
import styles from "./TaskList.module.css";

function TaskList({ tasks }) {
  return (
    <ul className={styles["task-list"]}>
      {tasks.map((task) => (
        <Task key={task.id} {...task} />
      ))}
    </ul>
  );
}

export default TaskList;
