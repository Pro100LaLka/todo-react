import { useEffect, useState } from "react";

function TaskModal({ ref, onSave, editingTask }) {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
  });

  useEffect(() => {
    if (editingTask) {
      setTaskData(editingTask);
    } else {
      resetTaskInputs();
    }
  }, [editingTask]);

  function updateField(field, value) {
    setTaskData((prev) => ({ ...prev, [field]: value }));
  }

  function resetTaskInputs() {
    setTaskData({
      title: "",
      description: "",
      dueDate: "",
      priority: "Medium",
    });
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
      className="m-auto w-full rounded-2xl bg-gray-800 text-gray-100"
    >
      <div className="px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">New Task</h2>
          <button
            onClick={closeModal}
            className="flex size-8 items-center justify-center rounded-md text-lg text-gray-400 hover:bg-gray-700"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
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
              className="focus: grow rounded-lg py-2.5 outline outline-neutral-700 hover:bg-gray-700 focus:outline-offset-1 focus:outline-gray-600 active:bg-gray-600"
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

export default TaskModal;
