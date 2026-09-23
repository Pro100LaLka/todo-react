import Folder from "./Folder";
import { useState, useRef } from "react";

function Folders({ folders, selectedFolder, onClick, addFolder, onRemove }) {
  const [folderName, setFolderName] = useState("");

  function handleNameChange(e) {
    setFolderName(e.target.value);
  }

  const dialogRef = useRef(null);

  function handleDialogClickOutside(e) {
    if (e.target === e.currentTarget) dialogRef.current.close();
  }

  function handleSubmit(e) {
    e.preventDefault();
    addFolder(folderName);
    dialogRef.current.close();
  }

  return (
    <div className="relative max-w-full overflow-hidden md:col-start-1 md:row-span-full md:row-start-1 md:flex md:flex-col md:border-r md:border-gray-600 md:bg-gray-900">
      <header className="hidden pl-6 md:block">
        <div className="my-7 flex cursor-default">
          <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-300">
            <i className="fa-solid fa-check text-base text-black"></i>
          </div>
          <h1 className="ml-3 flex items-center text-2xl font-semibold text-white">
            Tasker
          </h1>
        </div>
        <h2 className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
          Categories
        </h2>
      </header>
      <ul className="flex max-w-full scrollbar-thumb-gray-500 scrollbar-track-transparent items-center gap-2 overflow-x-auto p-2 pr-10 md:h-full md:flex-col md:items-stretch md:overflow-y-auto md:pr-2 md:pb-10">
        {folders.map((folder) => (
          <Folder
            key={folder.name}
            folder={folder}
            selectedFolder={selectedFolder}
            onClick={onClick}
            onRemove={onRemove}
          />
        ))}
        <li>
          <button
            onClick={() => dialogRef.current.showModal()}
            className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-dashed border-neutral-400 text-sm text-neutral-400 hover:bg-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200 active:bg-gray-800 md:mt-4 md:h-auto md:w-full md:justify-start md:rounded-xl md:p-2 md:text-start md:text-base md:hover:bg-gray-800 md:active:bg-gray-700"
          >
            <i className="fa-solid fa-plus size-4"></i>
            <span className="ml-2 hidden font-medium md:inline-block">
              Add category
            </span>
          </button>
          <dialog
            onClose={() => setFolderName("")}
            ref={dialogRef}
            onClick={handleDialogClickOutside}
            className="m-auto w-full max-w-200 rounded-2xl bg-gray-800 text-gray-100"
          >
            <div className="px-4 py-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">New Folder</h2>
                <button
                  onClick={() => dialogRef.current.close()}
                  className="flex size-8 items-center justify-center rounded-md text-lg text-gray-400 hover:bg-gray-700"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-1">
                <label htmlFor="folder-name" className="text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="folder-name"
                  value={folderName}
                  onChange={handleNameChange}
                  autoComplete="off"
                  className="mb-4 rounded-lg bg-gray-900 px-3.5 py-2.5 outline outline-neutral-700 focus:outline-gray-300"
                  placeholder="e.g. Personal"
                  required
                />
                <div className="grid w-full grid-cols-2 gap-x-3">
                  <button
                    type="button"
                    onClick={() => dialogRef.current.close()}
                    className="rounded-lg py-2.5 outline outline-neutral-700 hover:bg-gray-700/30 focus-visible:outline-offset-2 focus-visible:outline-gray-200 active:bg-gray-700/60"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-emerald-300 py-2.5 font-medium text-gray-900 outline hover:bg-emerald-300/70 focus-visible:outline-offset-2 focus-visible:outline-gray-200 active:bg-emerald-300/50"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </li>
      </ul>
      <div className="pointer-events-none absolute top-0 right-0 h-full w-12 bg-linear-to-l from-slate-950 to-transparent md:hidden"></div>
    </div>
  );
}

export default Folders;
