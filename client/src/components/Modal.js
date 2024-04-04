import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
const Modal = ({ mode, setShowModal, task, getData }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const editMode = mode === 'edit' ? true : false
  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : '',
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date()
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setData(data => ({
      ...data,
      [name]: value
    }))
  }
  const postData = async(e) =>{
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/todos',
        {
          method:"POST",
          headers:{'Content-type':'application/json'},
          body: JSON.stringify(data)
        }  
      )
      if(response.status===200){
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.error(error)
    }
  }
  const editData = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:5000/todos/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (response.status === 200) {
        setShowModal(false)
        getData()
      }
    } catch (err) {
      console.error(err)
    }
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
          <input className={mode} type='submit' onClick={editMode ? editData:postData}></input>
        </form>
      </div>
    </div>
  )
}

export default Modal
