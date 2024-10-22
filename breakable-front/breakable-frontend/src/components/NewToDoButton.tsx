import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css"; 
import "./css/button.css"
const EditModal: React.FC<{ todoId: number; onEdit: () => void }> = ({ todoId, onEdit }) => {
  interface ToDo {
    id: number;
    text: string;
    priority: string;
    dueDate: string;
    done: boolean;
    creationDate: string;
  }

  const [modal, setModal] = useState<boolean>(false);
  const [toDo, setToDo] = useState<ToDo | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchData = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:9090/todos/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setToDo(data);
      setDueDate(new Date(data.dueDate));
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("Failed to fetch task details.");
    }
  };

  useEffect(() => {
    fetchData(todoId);
  }, [todoId]);

  const toggleModal = () => {
    setModal((prev) => !prev);
    setErrorMessage(""); 
  };

  const handleEdit = async () => {
    if (toDo) {
      const updatedToDo = {
        ...toDo,
        dueDate: dueDate ? formatDate(dueDate) : toDo.dueDate,
        creationDate: toDo.creationDate,
      };

      try {
        const response = await fetch(`http://localhost:9090/todos/${todoId}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedToDo),
        });

        if (!response.ok) {
          throw new Error("Failed to update task");
        }

        onEdit(); 
        toggleModal();
      } catch (error) {
        console.error("Error updating task:", error);
        setErrorMessage("Error updating task. Please try again.");
      }
    }
  };

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <>
      <button onClick={toggleModal} className="action-buttons edit-button">
        Edit
      </button>

      {modal && (
        <div className="modal active">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content soft-pink">
            <h2>Edit To Do</h2>

            <div>To Do Name:</div>
            <input
              type="text"
              name="text"
              maxLength={120}
              defaultValue={toDo?.text}
              className="modal-input"
              onChange={(e) =>
                setToDo((prev) => (prev ? { ...prev, text: e.target.value } : null))
              }
            />

            <div>Priority:</div>
            <select
              name="priority"
              className="modal-select"
              defaultValue={toDo?.priority}
              onChange={(e) =>
                setToDo((prev) => (prev ? { ...prev, priority: e.target.value } : null))
              }
            >
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>

            <div>Due Date:</div>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              showTimeSelect
              className="modal-datepicker"
              dateFormat="Pp"
            />

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button className="close-modal" onClick={toggleModal}>
              X
            </button>
            <button className="btn-submit" onClick={handleEdit}>
              Save Changes
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditModal;


