import Task from "./Task";

function TaskList({
  tasks,
  selectedFolder,
  onToggle,
  onPriorityToggle,
  onEdit,
  onRemove,
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

  return (
    <ul className="flex flex-col gap-2 p-2">
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
  );
}

export default TaskList;
