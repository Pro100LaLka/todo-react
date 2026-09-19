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
    <div className="relative max-w-full overflow-hidden">
      <ul className="flex max-w-full items-center gap-2 overflow-x-auto p-2 pr-10">
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
            className="size-8 cursor-pointer rounded-full border border-dashed border-neutral-400 text-sm text-neutral-400 hover:bg-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 active:bg-gray-800"
          >
            <i className="fa-solid fa-plus size-4"></i>
          </button>
          <dialog
            onClose={() => setFolderName("")}
            ref={dialogRef}
            onClick={handleDialogClickOutside}
            className="m-auto w-full rounded-2xl bg-gray-800 text-gray-100"
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
                    className="rounded-lg py-2.5 outline outline-neutral-700 hover:bg-gray-700 focus-visible:outline-offset-2 focus-visible:outline-gray-200 active:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-emerald-300 py-2.5 font-medium text-gray-900 outline hover:bg-emerald-200 focus-visible:outline-offset-2 focus-visible:outline-gray-200 active:bg-emerald-100"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </li>
      </ul>
      <div className="pointer-events-none absolute top-0 right-0 h-full w-12 bg-linear-to-l from-slate-950 to-transparent"></div>
    </div>
  );
}

export default Folders;
