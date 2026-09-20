import Task from "./Task";

function TaskList({
  tasks,
  selectedFolder,
  onToggle,
  onPriorityToggle,
  onEdit,
  onRemove,
  onAdd,
}) {
  const priorityOrder = { High: 0, Medium: 1, Low: 2 };

  const sortedTasks = [...tasks].sort(
    (taskA, taskB) =>
      priorityOrder[taskA.priority] - priorityOrder[taskB.priority],
  );

  const filteredTasks = [...sortedTasks].filter((task) =>
    task.isComplete
      ? selectedFolder.name === "Archieve"
      : selectedFolder.name === "All" || selectedFolder.name === task.folder,
  );

  function getEmptyMessage(folderName) {
    if (folderName === "All")
      return "Add your first task and it will show up here";
    if (folderName === "Archieve")
      return "Tasks you mark as complete will show up here";
    return `Tasks you add to ${selectedFolder.name} will show up here`;
  }

  return filteredTasks.length !== 0 ? (
    <ul className="flex max-w-220 flex-col gap-2 p-2 md:px-10">
      {filteredTasks.map((task) => (
        <Task
          key={task.id}
          {...task}
          onToggle={onToggle}
          onPriorityToggle={onPriorityToggle}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      ))}
    </ul>
  ) : (
    <div className="m-auto mt-15 flex w-2/3 flex-col items-center justify-center gap-5">
      <div className="flex size-15 items-center justify-center rounded-2xl bg-gray-900">
        <i className="fa-solid fa-check text-xl text-gray-500"></i>
      </div>
      <h2 className="text-center text-xl font-bold text-gray-200">
        Nothing here yet
      </h2>
      <p className="text-center text-gray-400">
        {getEmptyMessage(selectedFolder.name)}
      </p>
      <button
        onClick={onAdd}
        className="rounded-lg bg-emerald-300 px-4 py-2 font-medium text-neutral-900 hover:bg-green-400 active:bg-green-500"
      >
        + Add task
      </button>
    </div>
  );
}

export default TaskList;
