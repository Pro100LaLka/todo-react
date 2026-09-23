function Header({ onAdd, selectedFolder, taskCount }) {
  return (
    <header className="flex justify-between p-4 md:px-12">
      <div className="flex cursor-default items-center md:hidden">
        <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-300">
          <i className="fa-solid fa-check text-base text-black"></i>
        </div>
        <h1 className="ml-3 flex items-center text-3xl font-semibold text-white">
          Tasker
        </h1>
      </div>
      <div className="hidden flex-col gap-3 md:flex">
        <h2 className="text-3xl font-bold text-gray-200 lg:text-4xl">
          {selectedFolder.name}
        </h2>
        <p className="text-gray-400">{taskCount()} Tasks</p>
      </div>
      <button
        onClick={onAdd}
        className="shrink-0 self-center rounded-lg bg-emerald-300 p-2.5 hover:brightness-75 active:brightness-60 sm:px-5 sm:py-2"
      >
        <i className="fa-solid fa-plus"></i>
        <span className="ml-2 hidden text-lg font-medium sm:inline">
          Add task
        </span>
      </button>
    </header>
  );
}

export default Header;
