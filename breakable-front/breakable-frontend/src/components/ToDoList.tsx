import React, { useEffect, useState } from "react";
import EditModal from "./NewToDoButton";
import "./css/ToDoList.css";

interface ToDo {
  id: number;
  text: string;
  priority: string;
  dueDate: string;
  done: boolean;
}

interface ToDoTableProps {
  toDos: ToDo[];
  refreshData: () => void;
}

const ToDoList: React.FC<ToDoTableProps> = ({ toDos, refreshData }) => {
  const [sortedToDos, setSortedToDos] = useState<ToDo[]>(toDos);
  const [sortColumn, setSortColumn] = useState<keyof ToDo | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setSortedToDos(toDos);
  }, [toDos, refreshData]);

  const updateDoneTrue = (id: number) => {
    fetch(`http://localhost:9090/todos/${id}/done`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to mark todo as done");
        refreshData();
      })
      .catch((error) => console.error("Error marking todo as done:", error));
  };

  const updateDoneFalse = (id: number) => {
    fetch(`http://localhost:9090/todos/${id}/undone`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to mark todo as undone");
        refreshData();
      })
      .catch((error) => console.error("Error marking todo as undone:", error));
  };

  const deleteAction = (id: number) => {
    fetch(`http://localhost:9090/todos/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete todo");
        refreshData();
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  const parseDate = (dateString: string): string => {
    const date: Date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleSort = (column: keyof ToDo) => {
    const direction =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(direction);

    const sorted = [...toDos].sort((a, b) => {
      if (column === "dueDate") {
        const dateA = new Date(a[column]);
        const dateB = new Date(b[column]);
        return direction === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }
      if (column === "priority") {
        const priorityOrder: { [key: string]: number } = {
          LOW: 1,
          MEDIUM: 2,
          HIGH: 3,
        };
        return direction === "asc"
          ? priorityOrder[a[column]] - priorityOrder[b[column]]
          : priorityOrder[b[column]] - priorityOrder[a[column]];
      }
      return a[column] < b[column]
        ? direction === "asc"
          ? -1
          : 1
        : direction === "asc"
        ? 1
        : -1;
    });

    setSortedToDos(sorted);
  };

  const totalPages = Math.ceil(sortedToDos.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedToDos.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="todo-container">
      <table className="todo-table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th onClick={() => handleSort("text")}>Task Name</th>
            <th onClick={() => handleSort("priority")}>Priority</th>
            <th onClick={() => handleSort("dueDate")}>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((todo) => (
              <tr key={todo.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={(e) => {
                      if (e.target.checked) {
                        updateDoneTrue(todo.id);
                      } else {
                        updateDoneFalse(todo.id);
                      }
                    }}
                  />
                </td>
                <td>{todo.text}</td>
                <td>{todo.priority}</td>
                <td>{parseDate(todo.dueDate)}</td>
                <td>
                  <EditModal todoId={todo.id} onEdit={refreshData} />/
                  <button
                    className="delete-button"
                    onClick={() => deleteAction(todo.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="no-todos">
                No todos available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`pagination-btn ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
