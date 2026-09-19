function Task({
  id,
  isComplete,
  title,
  description,
  priority,
  onToggle,
  onPriorityToggle,
  onEdit,
  onRemove,
}) {
  const priorityColors = {
    Low: "text-gray-400",
    Medium: "text-yellow-400",
    High: "text-red-400",
  };

  return (
    <li className="rounded-2xl bg-slate-900 px-3 py-1">
      <details>
        <summary className="group flex items-center gap-2 py-2 marker:content-none">
          <input
            type="checkbox"
            id={`toggle-btn-${id}`}
            checked={isComplete}
            onChange={() => onToggle(id)}
            className="peer sr-only"
          />
          <label
            htmlFor={`toggle-btn-${id}`}
            className="mx-1 flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-gray-500 peer-checked:border-emerald-300 peer-checked:bg-emerald-300 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-200"
          >
            <div className="hidden items-center justify-center group-[:has(:checked)]:flex">
              <i className="fa-solid fa-check text-xs"></i>
            </div>
          </label>
          <span className="min-w-0 grow text-lg wrap-break-word text-gray-200">
            {title}
          </span>
          <button
            onClick={() => onPriorityToggle(id)}
            className={`${priorityColors[priority]}`}
          >
            <i className="fa-regular fa-flag"></i>
          </button>
          <button onClick={() => onEdit(id)} className="text-gray-400">
            <i className="fa-solid fa-pencil"></i>
          </button>
          <button onClick={() => onRemove(id)} className="text-gray-400">
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </summary>
        <div className="m-1 ml-10 border-t border-gray-600 py-2">
          <p className="mb-2 text-gray-400">
            {description || "No description"}
          </p>
          <p className="text-gray-500">{priority || "No"} priority</p>
        </div>
      </details>
    </li>
  );
}

export default Task;
