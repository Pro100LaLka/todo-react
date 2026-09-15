import { useState } from "react";

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
    <dialog
      ref={ref}
      onClick={handleDialogClose}
      className="m-auto w-full rounded-2xl bg-gray-800 px-4 py-6 text-gray-100"
    >
      <div>
        <h2 className="mb-4 text-2xl font-semibold">New Task</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
          <label htmlFor="task-title" className="text-gray-300">
            Title
          </label>
          <input
            type="text"
            id="task-title"
            value={taskData.title}
            onChange={(e) => updateField("title", e.target.value)}
            autoComplete="off"
            className="mb-4 rounded-lg bg-gray-900 px-3.5 py-2.5 outline outline-neutral-700 focus:outline-neutral-400"
          />
          <label htmlFor="task-description" className="text-gray-300">
            Description (optional)
          </label>
          <input
            type="text"
            id="task-description"
            value={taskData.description}
            onChange={(e) => updateField("description", e.target.value)}
            autoComplete="off"
            className="mb-4 rounded-lg bg-gray-900 px-3.5 py-2.5 outline outline-neutral-700 focus:outline-neutral-400"
          />
          <label htmlFor="task-due-date" className="text-gray-300">
            Due date (optional)
          </label>
          <input
            type="date"
            id="task-due-date"
            value={taskData.dueDate}
            onChange={(e) => updateField("dueDate", e.target.value)}
            className="mb-6 rounded-lg bg-gray-900 px-3.5 py-2.5 outline outline-neutral-700 focus:outline-neutral-400"
          />
          <div className="grid w-full grid-cols-2 gap-x-3">
            <button
              type="button"
              onClick={closeModal}
              className="grow rounded-lg py-2.5 outline outline-neutral-700 hover:bg-gray-700 active:bg-gray-600"
            >
              Cancel
            </button>
            <button className="rounded-lg bg-emerald-300 py-2.5 font-medium text-gray-900 outline hover:bg-emerald-200 active:bg-emerald-100">
              Save
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default AddTaskModal;
