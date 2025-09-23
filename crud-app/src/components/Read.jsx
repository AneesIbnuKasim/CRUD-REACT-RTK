import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showUser } from '../app/userReducer'
import { Link } from 'react-router-dom'


function Read() {
    const dispatch = useDispatch()
    const {users, loading} = useSelector(state=>state.app)

    useEffect(()=>{
        dispatch(showUser())
    },[])

    {loading && <div>Loading....</div>}
  return (
    <>
  {
    users.map((user)=>(
        <div key={user.id} className="card w-50 mx-auto text-center">
        <div className="card-body">
    <h5 className="card-title">{user.name}</h5>
    <h6 className="card-subtitle mb-2 text-body-secondary">{user.email}</h6>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
    <Link to={'/'} className="card-link">Card link</Link>
    <Link className="card-link">Another link</Link>
  </div>
  </div>
    ))
  }
  </>

  )
}

export default Read
