import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './Layout/Header'
import Create from './components/Create'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Create/>}/>
      </Routes>
      </BrowserRouter>
      
      
    </>
  )
}

export default App
