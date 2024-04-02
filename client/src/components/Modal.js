import React, { useState } from 'react'

const Modal = ({ mode, setShowModal, task }) => {
  const editMode = mode === 'edit' ? true : false
  const [data, setData] = useState({
    user_email: editMode ? task.user_email : '',
    title: editMode ? task.title : '',
    progress: editMode ? task.progress : 50,
    date: editMode ? "" : new Date()
  })
  const handleChange = (e) => {
    console.log("change");
    const { name, value } = e.target
    setData(data => ({
      ...data,
      [name]: value
    }))
  }
  return (
    <div className='overlay'>
      <div className='modal'>
        <div className='form-title-container'>
          <h3>{mode} your task here!</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <form>
          <input type='text' required maxLength={30} placeholder="What's on your mind?" name='title' value={data.title} onChange={handleChange}></input>
          <br></br>
          <label htmlFor="range">Drag to select your current progress</label>
          <input type='range' id="range" min="0" max="100" name='progress' value={data.progress} onChange={handleChange}></input>
          <input className={mode} type='submit'></input>
        </form>
      </div>
    </div>
  )
}

export default Modal
