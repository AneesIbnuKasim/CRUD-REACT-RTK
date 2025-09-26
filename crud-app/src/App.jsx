import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './Layout/Header'
import Create from './components/Create'
import Read from './components/Read'
import Update from './components/Update'
import ErrorBoundary from './components/ErrorBoundary'
import { useDispatch } from 'react-redux'
import { showUser } from './app/userReducer'

function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(showUser())
  },[])

  return (
    <>
      <BrowserRouter>
      <ErrorBoundary>
      <Header/>
        <Routes>
          <Route path='/' element={<Create/>}/>
          <Route path='/read' element={<Read/>}/>
          <Route path='/edit/:id' element={<Update/>}/>
      </Routes>
      </ErrorBoundary>
      </BrowserRouter>
      
      
    </>
  )
}

export default App
