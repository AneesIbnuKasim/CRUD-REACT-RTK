import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, showUser } from '../app/userReducer'
import { Link } from 'react-router-dom'
import CustomModal from './CustomModal'


function Read() {
    const dispatch = useDispatch()
    const {users, loading} = useSelector(state=>state.app)
    const [id, setId] = useState('')
    const [showPopup, setShowPopup] = useState(false)

    useEffect(()=>{
        dispatch(showUser())
    },[])
    useEffect(()=>{
        console.log('id',id);
        
    },[id])

    if (loading) return <div className='text-center my-4 fs-1'>Loading....</div>
  return (
    <>
    {showPopup && <CustomModal id={id} showPopup={showPopup} setShowPopup={setShowPopup} />}
  { users &&
    users.map((user)=>(
        <div key={user.id} className="card w-50 mx-auto text-center">
        <div className="card-body">
    <h5 className="card-title">{user.name}</h5>
    <h6 className="card-subtitle mb-2 text-body-secondary">{user.email}</h6>
    <p className="card-text">Gender:{user.gender}</p>
    <button onClick={()=>{setId(user.id);setShowPopup(true)}} className="card-link text-light bg-primary">View</button>
    <Link className='card-link ' to={`/edit/${user.id}`}>
    <button className="bg-success text-light">Edit</button></Link>
    <button onClick={()=>dispatch(deleteUser(user.id))} className="card-link text-light bg-danger">Delete</button>
  </div>
  </div>
    ))
  }
  </>

  )
}

export default Read
