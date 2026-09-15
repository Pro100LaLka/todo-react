function Task({
  id,
  isComplete,
  title,
  description,
  priority,
  onToggle,
  onPriorityToggle,
}) {
  return (
    <li className="bg-slate-900 p-3">
      <details>
        <summary className="marker:content-none">
          <label
            htmlFor={`toggle-btn-${id}`}
            className="rounded-full border-2 border-gray-500"
          >
            <i className="fa-solid fa-check"></i>
          </label>
          <input
            type="checkbox"
            id={`toggle-btn-${id}`}
            checked={isComplete}
            onChange={() => onToggle(id)}
            className="sr-only"
          />
          <span>{title}</span>
          <button
            onClick={() => onPriorityToggle(id)}
            style={{
              color: `var(--color-priority--${priority})`,
            }}
          >
            <i className="fa-regular fa-flag"></i>
          </button>
          <button>
            <i className="fa-solid fa-pencil"></i>
          </button>
          <button>
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </summary>
        <div>
          <p>{description || "No description"}</p>
          <p>{priority || "No"} priority</p>
        </div>
      </details>
    </li>
  );
}

export default Task;
