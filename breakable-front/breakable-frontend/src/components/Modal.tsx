import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./css/modal.css";

interface ModalProps {
  onAdd: () => void;
}

const Modal: React.FC<ModalProps> = ({ onAdd }) => {
    const [priority, setPriority] = useState<string>("HIGH");
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");  
    const [modal, setModal] = useState<boolean>(false);
    const [newToDoText, setNewToDoText] = useState<string>("");

  const toggleModal = () => {
    setModal((prev) => !prev);
    setErrorMessage(""); 
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const formatDate = (date: Date): string => {
    const pad = (num: number) => String(num).padStart(2, "0");
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${day}/${month}/${year} ${hours}:${minutes}:00`;
  };

  const addToDo = () => {
    if (!newToDoText) {
      setErrorMessage("Add the task name");
      return;
    }if(!dueDate){
        setErrorMessage("Add the date!");
        return;
    }

    

    const newToDo = {
      text: newToDoText,
      priority: priority,
      dueDate: formatDate(dueDate),
      done:false
    };

    fetch("http://localhost:9090/createTodo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToDo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add task");
        }
        return response.json();
      })
      .then(() => {
        onAdd(); 
        toggleModal();
      })
      .catch((error) => {
        console.error("Error adding task:", error);
        setErrorMessage("Error adding task. Try again!");
      });
  };

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        + New To Do
      </button>

      {modal && (
        <div className="modal active">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Create To Do</h2>

            <div>To Do Name:</div>
            <input
              type="text"
              name="text"
              maxLength={120}
              className="modal-input"
              placeholder="Enter task name"
              onChange={(e) => setNewToDoText(e.target.value)}
              value={newToDoText}
            />

            <div>Priority:</div>
            <select
              name="priority"
              className="modal-select"
              onChange={(e) => setPriority(e.target.value)}
              value={priority}
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
              timeFormat="HH:mm:ss"
              timeIntervals={1}
              placeholderText="Select due date"
            />

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button className="close-modal" onClick={toggleModal}>
              X
            </button>
            <button type="submit" className="btn-submit" onClick={addToDo}>
              Add Task
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;