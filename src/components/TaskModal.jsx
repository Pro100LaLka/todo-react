import { useRef } from "react";

function TaskModal({ ref, taskData, onFieldChange, folders, onSave, onClose }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSave();
  }

  const dateInputRef = useRef(null);

  function handleDialogClose(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <dialog
      ref={ref}
      onClick={handleDialogClose}
      className="m-auto w-full max-w-200 scrollbar-thumb-gray-500 scrollbar-track-transparent rounded-2xl bg-gray-800 text-gray-100"
    >
      <div className="px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">New Task</h2>
          <button
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-md text-lg text-gray-400 hover:bg-gray-700"
          >
            <i className="fa-solid fa-xmark"></i>
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
            onChange={(e) => onFieldChange("title", e.target.value)}
            autoComplete="off"
            className="mb-4 rounded-lg bg-gray-900 px-3.5 py-2.5 outline outline-neutral-700 focus:outline-gray-300"
            required
          />
          <label htmlFor="task-description" className="text-gray-300">
            Description (optional)
          </label>
          <input
            type="text"
            id="task-description"
            value={taskData.description}
            onChange={(e) => onFieldChange("description", e.target.value)}
            autoComplete="off"
            className="mb-4 rounded-lg bg-gray-900 px-3.5 py-2.5 outline outline-neutral-700 focus:outline-gray-300"
          />
          <label htmlFor="task-due-date" className="text-gray-300">
            Due date (optional)
          </label>
          <input
            type="date"
            id="task-due-date"
            value={taskData.dueDate}
            onChange={(e) => onFieldChange("dueDate", e.target.value)}
            ref={dateInputRef}
            onFocus={() => dateInputRef.current.showPicker()}
            className="relative mb-4 rounded-lg bg-gray-900 px-3.5 py-2.5 outline outline-neutral-700 focus:outline-gray-300 [&::-webkit-calendar-picker-indicator]:invert-75"
          />
          <fieldset>
            <legend className="mb-1 text-gray-300">Priority</legend>
            <div className="mb-2 grid grid-cols-3 gap-3">
              <div className="has-checked:text-red-350 rounded-full bg-gray-900 text-center font-semibold text-gray-400 outline outline-neutral-700 hover:brightness-85 has-checked:bg-red-400/30 has-checked:outline-red-400 has-checked:hover:brightness-100 has-focus-visible:outline-offset-2 has-focus-visible:outline-gray-200">
                <input
                  type="radio"
                  name="priority"
                  id="high"
                  className="peer sr-only"
                  value="High"
                  checked={taskData.priority === "High"}
                  onChange={(e) => onFieldChange("priority", e.target.value)}
                />
                <label
                  htmlFor="high"
                  className="inline-block h-full w-full cursor-pointer rounded-full py-1.5 peer-checked:cursor-default"
                >
                  High
                </label>
              </div>
              <div className="rounded-full bg-gray-900 text-center font-semibold text-gray-400 outline outline-neutral-700 hover:brightness-85 has-checked:bg-yellow-400/30 has-checked:text-yellow-400 has-checked:outline-yellow-400 has-checked:hover:brightness-100 has-focus-visible:outline-offset-2 has-focus-visible:outline-gray-200">
                <input
                  type="radio"
                  name="priority"
                  id="medium"
                  className="peer sr-only"
                  value="Medium"
                  checked={taskData.priority === "Medium"}
                  onChange={(e) => onFieldChange("priority", e.target.value)}
                />
                <label
                  htmlFor="medium"
                  className="inline-block h-full w-full cursor-pointer rounded-full py-1.5 peer-checked:cursor-default"
                >
                  Medium
                </label>
              </div>
              <div className="rounded-full bg-gray-900 text-center font-semibold text-gray-400 outline outline-neutral-700 hover:brightness-85 has-checked:bg-gray-400/30 has-checked:text-gray-300 has-checked:outline-gray-400 has-checked:hover:brightness-100 has-focus-visible:outline-offset-2 has-focus-visible:outline-gray-200">
                <input
                  type="radio"
                  name="priority"
                  id="low"
                  className="peer sr-only"
                  value="Low"
                  checked={taskData.priority === "Low"}
                  onChange={(e) => onFieldChange("priority", e.target.value)}
                />
                <label
                  htmlFor="low"
                  className="inline-block h-full w-full cursor-pointer rounded-full py-1.5 peer-checked:cursor-default"
                >
                  Low
                </label>
              </div>
            </div>
          </fieldset>
          <label htmlFor="task-folder" className="text-gray-300">
            Folder
          </label>
          <div className="mb-4 grid grid-cols-1 items-center">
            <select
              id="task-folder"
              value={taskData.folder}
              onChange={(e) => onFieldChange("folder", e.target.value)}
              className="peer col-start-1 row-start-1 w-full appearance-none rounded-lg bg-gray-900 px-3.5 py-2.5 outline outline-neutral-700 focus:outline-gray-300"
            >
              {folders.slice(1, -1).map((folder) => (
                <option key={folder.name} value={folder.name} className="w-5">
                  {folder.name}
                </option>
              ))}
            </select>
            <i className="fa-solid fa-chevron-down align-self-center pointer-events-none col-start-1 row-start-1 mr-3 justify-self-end text-gray-400 peer-open:rotate-180"></i>
          </div>
          <div className="grid w-full grid-cols-2 gap-x-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg py-2.5 outline outline-neutral-700 hover:bg-gray-700/30 focus-visible:outline-offset-2 focus-visible:outline-gray-200 active:bg-gray-700/60"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-emerald-300 py-2.5 font-medium text-gray-900 outline hover:bg-emerald-300/70 focus-visible:outline-offset-2 focus-visible:outline-gray-200 active:bg-emerald-300/50"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default TaskModal;
