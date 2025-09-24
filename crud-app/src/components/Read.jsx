import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, showUser } from '../app/userReducer'
import { Link } from 'react-router-dom'
import CustomModal from './CustomModal'

function Read() {
    const dispatch = useDispatch()
    const { users, loading, searchTerm } = useSelector(state=>state.app)
    const [id, setId] = useState('')
    const [showPopup, setShowPopup] = useState(false)
    const [genderFilter, setGenderFilter] = useState('all')

    useEffect(()=>{
        dispatch(showUser())
    },[])

    const filteredUsers = users.filter(user=>{
        if(searchTerm.length===0) {
            return true
        }
        else {
            return Object?.values(user).join('').toLowerCase().includes(searchTerm.toLowerCase())
        }
    })
    .filter(user=>{
        if(genderFilter==='all') return true
        return user.gender === genderFilter
    })

    if (loading) return <div className='text-center my-4 fs-1'>Loading....</div>
  return (
    <>
    {showPopup && <CustomModal id={id} showPopup={showPopup} setShowPopup={setShowPopup} />}

    {/*------ radio filter ------*/}
    
    <div className='text-center d-flex gap-2 my-3 justify-content-center'>
        <input type="radio" checked={genderFilter==='all'} onChange={(e)=>setGenderFilter(e.target.value)} value={'all'} name="gender" id="" /> All
        <input type="radio" checked={genderFilter==='male'} onChange={(e)=>setGenderFilter(e.target.value)} value={'male'} name='gender' /> Male
        <input checked={genderFilter==='female'} onChange={(e)=>setGenderFilter(e.target.value)} type="radio" value={'female'} name='gender' /> Female
        </div>

  { filteredUsers && filteredUsers.length > 0 ? (

    filteredUsers.map((user)=>( 
        <>
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
  </>)
    )):
    (<div className='text-center my-5'>
        <h1>No users found...</h1>
    </div>)
  }
  </>

  )
}

export default Read
