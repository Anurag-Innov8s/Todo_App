import React, { useState } from 'react'
import TickIcon from './TickIcon'
import ProgressBar from './ProgressBar'
import Modal from './Modal';
const ListItem = ({task,getData}) => {
  const delHandler = async(e) =>{
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/todos/${task.id}`,{
        method:"DELETE",
        headers:{"Content-Type":"appliation/json"},
      })
      if(response.status===200){
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  }
  const [showModal,setShowModal] = useState(false);
  return (
    <li className='list-item'>
      <div className='info-container'>
        <TickIcon/>
        <p className='task-title'>{task.title}</p>
        
        <ProgressBar progress = {task.progress}/>
      </div>
      <div className='button-container'>
        <button className='edit' onClick={()=>setShowModal(true)}>EDIT</button>
        <button className='delete' onClick={delHandler}>DELETE</button>
      </div>
      {showModal && <Modal mode={'edit'} setShowModal={setShowModal} task={task} getData={getData}/>}
    </li>
  )
}

export default ListItem
 