import React, { useState } from "react";
import "./css/ToDoSearch.css";

type FilterProps = {
  onFilterChange: (text: string, priority: string, done: string) => void;
};

const FilterMenu: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [text, setText] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [done, setDone] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    onFilterChange(text, priority, done); 
  };

  return (
    <form onSubmit={handleSubmit} className="filter-form">
      <div className="filter-group">
        <label htmlFor="text" className="filter-label">Task Name</label>
        <input
          type="text"
          id="text"
          className="filter-input"
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Enter task name"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="priority" className="filter-label">Priority</label>
        <select
          id="priority"
          className="filter-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">All</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="done" className="filter-label">State</label>
        <select
          id="done"
          className="filter-select"
          value={done}
          onChange={(e) => setDone(e.target.value)}
        >
          <option value="">All</option>
          <option value="done">Done</option>
          <option value="undone">Undone</option>
        </select>
      </div>

      <div className="filter-group search-button">
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </div>
    </form>
  );
};

export default FilterMenu;