import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import { TodoFilters } from "./TodoFilters";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);

  // Function to fetch todos from local storage
  const fetchTodos = () => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
      setFilteredTodos(JSON.parse(storedTodos));
    }
  };

  // Function to save todos to local storage
  const saveTodos = todos => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  // Add todo
  const addTodo = todo => {
    const newTodo = {
      id: uuidv4(),
      task: todo,
      completed: false,
      isEditing: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  // Delete todo
  const deleteTodo = id => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  // Toggle todo completion
  const toggleComplete = id => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  // Toggle todo editing
  const editTodo = id => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
    );
    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  // Edit task
  const editTask = (task, id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
    );
    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  // Fetch todos from local storage when component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="TodoWrapper">
      <h1>To-Do React App!</h1>
      <TodoForm addTodo={addTodo} />
      <TodoFilters todos={todos} setFilteredTodos={setFilteredTodos} />
      {/* display todos */}
      {filteredTodos.map(todo =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};
