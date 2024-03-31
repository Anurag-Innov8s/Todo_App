import React, { useState, useEffect } from "react";
import axios from "axios";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";


export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/todos"
      );
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (todo) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/newtodo",
        { task: todo }
      );
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deltodo/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  

  const editTodo = async (id, task) => {
    try {
      await axios.put(`http://localhost:5000/api/todos/${id}`, { task });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      {/* Display todos */}
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm
            // key={todo.id}
            // editTodo={(task) => editTodo(todo.id, task)}
            // task={todo.task}
          />
        ) : (
          <Todo
            key={todo.id}
            // task={todo.task}
            // deleteTodo={() => deleteTodo(todo.id)}
            // editTodo={() => editTodo(todo.id, todo.task)}
            // toggleComplete={() => toggleComplete(todo.id)}
          />
        )
      )}
    </div>
  );
};
