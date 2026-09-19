import clsx from "clsx";

function Folder({ folder, selectedFolder, onClick, onRemove }) {
  return (
    <li className="group relative">
      <input
        type="radio"
        name="folder"
        id={folder.name}
        className="sr-only"
        checked={folder === selectedFolder}
        onChange={() => onClick(folder)}
      />
      <label
        htmlFor={folder.name}
        className={clsx(
          "font-inter relative flex cursor-pointer rounded-full bg-slate-900 px-4 py-2 text-base whitespace-nowrap text-neutral-400 transition-[padding] duration-200 select-none group-has-checked:cursor-default group-has-checked:bg-emerald-300 group-has-checked:text-black",
          folder.removable && "group-has-checked:pr-8 hover:pr-8",
        )}
      >
        {folder.name}
        <button
          onClick={() => onRemove(folder.name)}
          className={clsx(
            "absolute right-2 scale-x-0 cursor-pointer text-gray-400 transition-transform duration-200 group-hover:scale-x-100 group-has-checked:scale-x-100 group-has-checked:text-gray-800 hover:text-gray-500 active:text-gray-600",
            folder.removable || "hidden",
          )}
        >
          <i className="fa-solid fa-circle-xmark"></i>
        </button>
      </label>
    </li>
  );
}

export default Folder;
