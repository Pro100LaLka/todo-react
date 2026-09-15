function Header({ onAdd }) {
  return (
    <header className="flex justify-between p-4">
      <h1 className="text-4xl font-semibold text-white">My Tasks</h1>
      <button onClick={onAdd} className="size-10 rounded-lg bg-emerald-300">
        <i className="fa-solid fa-plus"></i>
      </button>
    </header>
  );
}

export default Header;
