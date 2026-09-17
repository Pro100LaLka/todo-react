import Task from "./Task";

function TaskList({ tasks, onToggle, onPriorityToggle, onEdit, onRemove }) {
  const priorityOrder = { High: 0, Medium: 1, Low: 2 };

  const sortedTasks = [...tasks].sort(
    (taskA, taskB) =>
      priorityOrder[taskA.priority] - priorityOrder[taskB.priority],
  );

  return (
    <ul className="flex flex-col gap-2 p-2">
      {sortedTasks.map((task) => (
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
