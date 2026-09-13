import styles from "./AddTaskModal.module.css";
import { useState } from "react";

function AddTaskModal({ ref, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSave({ title, description, dueDate, priority });
  }

  return (
    <dialog className={styles.dialog} ref={ref}>
      <h2 className={styles.title}>New Task</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="task-title">Title</label>
        <input
          type="text"
          id="task-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="task-description">Description (optional)</label>
        <input
          type="text"
          id="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="task-due-date">Due date (optional)</label>
        <input
          type="date"
          id="task-due-date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button>Save</button>
      </form>
    </dialog>
  );
}

export default AddTaskModal;
