import Header from "./components/Header";
import AddTaskModal from "./components/AddTaskModal";
import Folders from "./components/Folders";
import TaskList from "./components/TaskList";
import { useState, useEffect, useRef } from "react";

function App() {
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) ?? [],
  );

  const addTaskModal = useRef(null);

  function addTask(taskData) {
    setTasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        isComplete: false,
        ...taskData,
      },
    ]);
  }

  function handleSave(taskData) {
    addTask(taskData);
    addTaskModal.current.close();
  }

  function handleTaskToggle(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task,
      ),
    );
  }

  function switchPriority(priority) {
    const priorities = ["low", "medium", "high"];
    const newIndex = (priorities.indexOf(priority) + 1) % 3;
    return priorities[newIndex];
  }

  function handlePriorityToggle(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              priority: switchPriority(task.priority),
            }
          : task,
      ),
    );
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(tasks);
  }, [tasks]);

  return (
    <>
      <Header onAdd={() => addTaskModal.current.showModal()} />
      <Folders />
      <TaskList
        tasks={tasks}
        onToggle={handleTaskToggle}
        onPriorityToggle={handlePriorityToggle}
      />
      <AddTaskModal ref={addTaskModal} onSave={handleSave} />
    </>
  );
}

export default App;
