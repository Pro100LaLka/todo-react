function Header({ onAdd }) {
  return (
    <>
      <h1 className="title">My Tasks</h1>
      <button className="add-task" onClick={onAdd}>
        <i className="fa-solid fa-plus"></i>
      </button>
    </>
  );
}

export default Header;
