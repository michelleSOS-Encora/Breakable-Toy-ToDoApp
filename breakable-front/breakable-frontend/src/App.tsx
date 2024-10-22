import { useEffect, useState } from "react";
import "./App.css";
import ToDoList from "./components/ToDoList.tsx";
import SearchSection from "./components/SearchSection.tsx";
import AverageTimeBox from "./components/AverageTimeBox.tsx";
import Modal from "./components/Modal.tsx";


function App() {
  const [toDo, setToDo] = useState<any[]>([]);

  const fetchData = () => {
    fetch("http://localhost:9090/todos", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => setToDo(json))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const fetchFilteredData = (text: string, priority: string, done: string) => {
    fetch(`http://localhost:9090/todos/filter/${text}-${priority}-${done}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => setToDo(json))
      .catch((error) => console.error("Error fetching data:", error));
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <h2>To Do App</h2>
      <SearchSection onFilterChange={fetchFilteredData} />
      <Modal onAdd={fetchData} />
      <ToDoList toDos={toDo} refreshData={fetchData} />
      <AverageTimeBox toDos={toDo} />
    </>
  );
}

export default App;
