import Header from "./components/Header";
import TaskModal from "./components/TaskModal";
import Folders from "./components/Folders";
import TaskList from "./components/TaskList";
import { useState, useEffect, useRef } from "react";

function App() {
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) ?? [],
  );

  const taskModal = useRef(null);
  const emptyTask = {
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
  };
  const [taskData, setTaskData] = useState(emptyTask);

  function handleFieldChange(field, value) {
    setTaskData((prev) => ({ ...prev, [field]: value }));
  }

  const [editingTask, setEditingTask] = useState(null);

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

  function handleClose() {
    setTaskData(emptyTask);
    setEditingTask(null);
    taskModal.current.close();
  }

  function handleSave() {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTask.id ? { ...task, ...taskData } : task,
        ),
      );
    } else {
      addTask(taskData);
    }
    handleClose();
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

  function handleEdit(id) {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditingTask(taskToEdit);
    setTaskData(taskToEdit);
    taskModal.current.showModal();
  }

  function handleRemove(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log({ tasks });
  }, [tasks]);

  useEffect(() => {
    console.log({ taskData });
  }, [taskData]);

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
        taskData={taskData}
        onFieldChange={handleFieldChange}
        onSave={handleSave}
        onClose={handleClose}
      />
    </>
  );
}

export default App;
