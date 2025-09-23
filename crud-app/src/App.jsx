import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './Layout/Header'
import Create from './components/Create'
import Read from './components/Read'
import CustomModal from './components/CustomModal'
import Update from './components/Update'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Create/>}/>
          <Route path='/read' element={<Read/>}/>
          <Route path='/edit/:id' element={<Update/>}/>
      </Routes>
      </BrowserRouter>
      
      
    </>
  )
}

export default App
