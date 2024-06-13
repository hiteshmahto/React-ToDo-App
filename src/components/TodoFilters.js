import React from "react";
import "../App.css";

export const TodoFilters = ({ todos, setFilteredTodos }) => {
  const handleSort = () => {
    const sortedTodos = [...todos].sort((a, b) => a.task.localeCompare(b.task));
    setFilteredTodos(sortedTodos);
  };

  const handleFilterCompleted = () => {
    const completedTodos = todos.filter(todo => todo.completed);
    setFilteredTodos(completedTodos);
  };

  const handleFilterActive = () => {
    const activeTodos = todos.filter(todo => !todo.completed);
    setFilteredTodos(activeTodos);
  };

  const handleClearFilter = () => {
    setFilteredTodos(todos);
  };

  return (
    <div className="TodoFilters">
      <button onClick={handleSort}>Sort Alphabetically</button>
      <button onClick={handleFilterCompleted}>Completed Task</button>
      <button onClick={handleFilterActive}>Active Task</button>
      <button id="redBtn" onClick={handleClearFilter}>
        Clear Filter
      </button>
    </div>
  );
};
