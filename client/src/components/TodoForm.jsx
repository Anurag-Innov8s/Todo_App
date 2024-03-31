import React, {useState} from 'react'
import axios from 'axios';
export const TodoForm = ({addTodo}) => {
    const [value, setValue] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/newtodo',{
              value,
            });
            addTodo(value);
            console.log(response.data);
            setValue("");
          } catch (error) {
            console.log(error);
            
            alert("Error while adding task, please try again after some time.")
          }
      };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder='What is the task today?' />
    <button type="submit" className='todo-btn'>Add Task</button>
  </form>
  )
}