import Header from "./components/Header";
import AddTaskModal from "./components/AddTaskModal";
import Folders from "./components/Folders";
import TaskList from "./components/TaskList";
import { useState, useEffect, useRef } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  const addTaskModal = useRef(null);

  function handleAdd() {
    addTaskModal.current.showModal();
  }

  function addTask(taskData) {
    setTasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        ...taskData,
      },
    ]);
  }

  function handleSave(taskData) {
    addTask(taskData);
    addTaskModal.current.close();
  }

  useEffect(() => {
    console.log(tasks);
  });

  return (
    <>
      <Header onAdd={handleAdd} />
      <Folders />
      <TaskList tasks={tasks} />
      <AddTaskModal ref={addTaskModal} onSave={handleSave} />
    </>
  );
}

export default App;
