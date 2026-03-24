import { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });


  const handleAddTask = () => {
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTask("");
  };


  const handleDelete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.filter((item) => item.id !== id)
    );
  };

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((item) =>
        item.id === id
          ? {...item, completed: !item.completed}
          :item
      )
    )
  }


  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("Saved:", tasks);
  }, [tasks]);

  return (<div
    style={{
      maxWidth: "400px",
      margin: "0 auto",
      border: "1px solid black",
      borderRadius: "30px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "5px",
      background: "linear-gradient(360deg, rgba(73,68,171,1) 21%, rgba(0,177,247,1) 79%)",
      color: "white",
    }}
  >
    
      <h1>Todo App</h1>

      <input
        style={{ marginRight: "10px", padding: "7px",borderRadius: "16px",border: "1px solid grey" }}
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={handleAddTask} style={{color: "white",padding:"5px",backgroundColor: "#00B7FF",borderRadius: "5px",border:"1px solid grey",  width: "50px"}}>Add</button>

      <ul style={{
        listStyle: "none",
        display: "flex",
        justifyContent: "center "
      }}>
    
  {tasks.map((item) => (
    <li key={item.id} style={{
    }}>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => toggleTask(item.id)}
      />

      <span
        style={{
          textDecoration: item.completed ? "line-through" : "none"
        }}
      >
        {item.text}
      </span>

      <button onClick={() => handleDelete(item.id) }style={{marginRight: "0px",}}>X</button>
    </li>
  ))}
</ul>
  
    </div>
  );
}

export default App;