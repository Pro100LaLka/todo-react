import Header from "./components/Header";
import TaskModal from "./components/TaskModal";
import Folders from "./components/Folders";
import TaskList from "./components/TaskList";
import { useState, useEffect, useRef } from "react";

function App() {
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) ?? [],
  );

  const [editingTask, setEditingTask] = useState(null);

  const taskModal = useRef(null);

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
    if (editingTask) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTask.id ? { ...task, ...taskData } : task,
        ),
      );
    } else {
      addTask(taskData);
    }
    taskModal.current.close();
  }

  function handleTaskToggle(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task,
      ),
    );
  }

  function switchPriority(priority) {
    const priorities = ["Low", "Medium", "High"];
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

  function handleRemove(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function handleEdit(id) {
    setEditingTask(tasks.find((task) => task.id === id));
    taskModal.current.showModal();
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(tasks);
  }, [tasks]);

  return (
    <>
      <Header onAdd={() => taskModal.current.showModal()} />
      <Folders />
      <TaskList
        tasks={tasks}
        onToggle={handleTaskToggle}
        onPriorityToggle={handlePriorityToggle}
        onEdit={handleEdit}
        onRemove={handleRemove}
      />
      <TaskModal
        ref={taskModal}
        onSave={handleSave}
        editingTask={editingTask}
      />
    </>
  );
}

export default App;
