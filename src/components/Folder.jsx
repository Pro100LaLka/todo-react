import clsx from "clsx";

function Folder({ folder, selectedFolder, onClick, onRemove }) {
  return (
    <li className="group relative">
      <input
        type="radio"
        name="folder"
        id={folder.name}
        className="peer sr-only"
        checked={folder === selectedFolder}
        onChange={() => onClick(folder)}
      />
      <label
        htmlFor={folder.name}
        className={clsx(
          "font-inter relative flex cursor-pointer items-center rounded-full bg-slate-900 px-4 py-2 text-base whitespace-nowrap text-neutral-400 transition-[padding] duration-200 select-none group-has-checked:cursor-default group-has-checked:bg-emerald-300 group-has-checked:text-black peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-200 md:rounded-xl md:bg-transparent md:px-3 md:text-lg md:font-medium md:whitespace-normal md:text-gray-300 md:group-has-checked:bg-emerald-300/20 md:group-has-checked:text-emerald-300 md:hover:bg-gray-800 md:group-has-checked:hover:bg-emerald-300/20",
          folder.removable && "group-has-checked:pr-8 hover:pr-8",
        )}
      >
        <span className="mr-4 hidden size-2.5 shrink-0 rounded-full bg-gray-500 group-has-checked:bg-emerald-300 md:inline-block"></span>
        <span className="md:max-w-48">{folder.name}</span>
        <button
          onClick={() => onRemove(folder.name)}
          className={clsx(
            "absolute right-2 scale-x-0 cursor-pointer text-gray-400 transition-transform duration-200 group-hover:scale-x-100 group-has-checked:scale-x-100 group-has-checked:text-gray-800 hover:text-gray-500 focus:scale-x-100 active:text-gray-600 md:group-has-checked:text-emerald-300 md:group-has-checked:hover:text-emerald-300/65",
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
