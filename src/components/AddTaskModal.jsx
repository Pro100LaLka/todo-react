import styles from "./AddTaskModal.module.css";
import { useState, useRef } from "react";

function AddTaskModal({ ref, onSave }) {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
  });

  function updateField(field, value) {
    setTaskData((prev) => ({ ...prev, [field]: value }));
  }

  function resetTaskInputs() {
    setTaskData({ title: "", description: "", dueDate: "", priority: "" });
  }

  function closeModal() {
    ref.current.close();
    resetTaskInputs();
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(taskData);
    resetTaskInputs();
  }

  function handleDialogClose(e) {
    if (e.target === e.currentTarget) closeModal();
  }

  return (
    <dialog className={styles.dialog} ref={ref} onClick={handleDialogClose}>
      <div className={styles.dialogContainer}>
        <h2 className={styles.title}>New Task</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="task-title">Title</label>
          <input
            type="text"
            id="task-title"
            value={taskData.title}
            onChange={(e) => updateField("title", e.target.value)}
            autoComplete="off"
          />
          <label htmlFor="task-description">Description (optional)</label>
          <input
            type="text"
            id="task-description"
            value={taskData.description}
            onChange={(e) => updateField("description", e.target.value)}
            autoComplete="off"
          />
          <label htmlFor="task-due-date">Due date (optional)</label>
          <input
            type="date"
            id="task-due-date"
            value={taskData.dueDate}
            onChange={(e) => updateField("dueDate", e.target.value)}
          />
          <div className={styles.buttons}>
            <button
              className={styles.cancel}
              type="button"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button className={styles.save}>Save</button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default AddTaskModal;
