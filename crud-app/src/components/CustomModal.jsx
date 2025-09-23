import React, { useEffect, useMemo } from 'react'
import './CustomModal.css'
import { useSelector } from 'react-redux'

function CustomModal(props) {
    const {id,showPopup,setShowPopup} = props
    const users = useSelector(state=>state.app.users)
    const user = useMemo(()=>{
        return users.find(item=>id===item.id)
    },[id])

    useEffect(()=>{
        console.log(user);
        
    },[id])


  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
    <button onClick={()=>setShowPopup(false)} className='close'>X</button>
      <h1>Name: {user.name}</h1>
      <h2> Email: {user.email} </h2>
      <p>Gender: {user.gender}</p>
      <p>City: {user.city}</p>
      <p>created: {user.createdAt}</p>
      </div>
    </div>
  )
}

export default CustomModal
