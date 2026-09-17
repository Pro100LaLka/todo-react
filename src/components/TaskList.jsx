import Task from "./Task";

function TaskList({ tasks, onToggle, onPriorityToggle, onEdit, onRemove }) {
  return (
    <ul className="flex flex-col gap-2 p-2">
      {tasks.map((task) => (
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
