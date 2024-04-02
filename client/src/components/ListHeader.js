import React, { useState } from 'react'
import Modal from './Modal';

const ListHeader = ({listName}) => {
    const [showModal, setShowModal] = useState(false);
    const signOut = () =>{
        console.log('Logged Out');
    }
  return (
    <div className='list-header'>
      <h1>{listName}</h1>
      <div className='button-container'>
        <button className='create' onClick={()=>setShowModal(true)}>Add Todo</button>
        <button className='signout' onClick={signOut}>Log Out</button>
      </div>
      {showModal && <Modal mode={'create'} setShowModal={setShowModal}/>}
    </div>
  )
}

export default ListHeader
