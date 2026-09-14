import Task from "./Task";
import styles from "./TaskList.module.css";

function TaskList({ tasks, onToggle, onPriorityToggle }) {
  return (
    <ul className={styles.taskList}>
      {tasks.map((task) => (
        <Task
          key={task.id}
          {...task}
          onToggle={onToggle}
          onPriorityToggle={onPriorityToggle}
        />
      ))}
    </ul>
  );
}

export default TaskList;
