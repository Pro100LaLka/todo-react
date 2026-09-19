import Header from "./components/Header";
import TaskModal from "./components/TaskModal";
import Folders from "./components/Folders";
import TaskList from "./components/TaskList";
import { useState, useEffect, useRef } from "react";

const emptyTask = {
  title: "",
  description: "",
  dueDate: "",
  priority: "Low",
  folder: "Uncategorized",
};

function switchPriority(priority) {
  const priorities = ["Low", "Medium", "High"];
  const newIndex = (priorities.indexOf(priority) + 1) % 3;
  return priorities[newIndex];
}

function App() {
  // -------------------- folders --------------------
  const [folders, setFolders] = useState(
    () =>
      JSON.parse(localStorage.getItem("folders")) ?? [
        { name: "All", removable: false },
        { name: "Uncategorized", removable: false },
        { name: "Archieve", removable: false },
      ],
  );

  const [selectedFolder, setSelectedFolder] = useState(folders[0]);

  function handleFolderClick(folder) {
    if (selectedFolder.name === folder.name) return;
    setSelectedFolder(folder);
  }

  function addFolder(name) {
    const exists = folders.some(
      (folder) => folder.name.toLowerCase() === name.toLowerCase(),
    );
    if (exists) return;

    setFolders((prev) => [
      ...prev.slice(0, -1),
      { name, removable: true },
      prev.at(-1),
    ]);
  }

  function removeFolder(name) {
    setFolders((prev) => prev.filter((folder) => folder.name !== name));
  }

  // -------------------- tasks --------------------
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) ?? [],
  );

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

  function handleTaskToggle(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task,
      ),
    );
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

  // -------------------- task modal --------------------
  const taskModal = useRef(null);

  const [taskData, setTaskData] = useState(emptyTask);

  const [editingTask, setEditingTask] = useState(null);

  function handleFieldChange(field, value) {
    setTaskData((prev) => ({ ...prev, [field]: value }));
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

  function handleEdit(id) {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditingTask(taskToEdit);
    setTaskData(taskToEdit);
    taskModal.current.showModal();
  }

  // -------------------- persistence --------------------
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("folders", JSON.stringify(folders));
  }, [folders]);

  return (
    <>
      <Header onAdd={() => taskModal.current.showModal()} />
      <Folders
        folders={folders}
        selectedFolder={selectedFolder}
        onClick={handleFolderClick}
        addFolder={addFolder}
        onRemove={removeFolder}
      />
      <TaskList
        tasks={tasks}
        selectedFolder={selectedFolder}
        onToggle={handleTaskToggle}
        onPriorityToggle={handlePriorityToggle}
        onEdit={handleEdit}
        onRemove={handleRemove}
      />
      <TaskModal
        ref={taskModal}
        taskData={taskData}
        onFieldChange={handleFieldChange}
        folders={folders}
        onSave={handleSave}
        onClose={handleClose}
      />
    </>
  );
}

export default App;
