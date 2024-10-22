import React from "react";
import "./css/AverageTimeBox.css"
interface ToDo {
  id: number;
  text: string;
  priority: string;
  dueDate: string;
  creationDate: string; 
  doneDate: string; 
  done: boolean;
}

interface MetricsProps {
  toDos: ToDo[];
}

const Metrics: React.FC<MetricsProps> = ({ toDos }) => {
  const calculateAverageTime = () => {
    const finishedTasks = toDos.filter(
      (todo) => todo.done && todo.doneDate && todo.creationDate
    );
    const totalTimeInMillis = finishedTasks.reduce((total, todo) => {
      const creationDate = new Date(todo.creationDate).getTime();
      const doneDate = new Date(todo.doneDate).getTime();
      return total + (doneDate - creationDate);
    }, 0);

    const averageTimeInMillis =
      finishedTasks.length > 0 ? totalTimeInMillis / finishedTasks.length : 0;

    return formatTime(averageTimeInMillis);
  };

  const calculateAverageTimeByPriority = (priority: string) => {
    const finishedTasks = toDos.filter(
      (todo) => todo.done && todo.priority === priority
    );
    const totalTimeInMillis = finishedTasks.reduce((total, todo) => {
      const creationDate = new Date(todo.creationDate).getTime();
      const doneDate = new Date(todo.doneDate).getTime();
      return total + (doneDate - creationDate);
    }, 0);

    const averageTimeInMillis =
      finishedTasks.length > 0 ? totalTimeInMillis / finishedTasks.length : 0;

    return formatTime(averageTimeInMillis);
  };

  const formatTime = (timeInMillis: number) => {
    const hours = Math.floor((timeInMillis / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeInMillis / (1000 * 60)) % 60);
    const seconds = Math.floor((timeInMillis / 1000) % 60);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="black-border-mp">
      <div>Average time to finish tasks: {calculateAverageTime()}</div>
      <div>Average time to finish tasks by priority:</div>
      <div>Low: {calculateAverageTimeByPriority("LOW")}</div>
      <div>Medium: {calculateAverageTimeByPriority("MEDIUM")}</div>
      <div>High: {calculateAverageTimeByPriority("HIGH")}</div>
    </div>
  );
};

export default Metrics;
