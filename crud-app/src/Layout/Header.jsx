import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchTerm } from '../app/userReducer'
import { Link } from 'react-router-dom'

function Header() {
  const allUsers = useSelector(state=>state.app.users)
  const dispatch = useDispatch()
  const [ searchData, setSearchData ] =useState('')

  const handleSearch = (e)=>{
    setSearchData(e.target.value)
    dispatch(setSearchTerm(e.target.value))

  }
    
  return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <span className="navbar-brand">REACT RTK</span>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={'/'}>Create User</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'/read'}>Show users({allUsers.length})</Link>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input value={searchData} onChange={handleSearch} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success">Search</button>
      </form>
    </div>
  </div>
</nav>
  )
}

export default Header
