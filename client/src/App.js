import React from 'react'
import './App.css'
import {Route,BrowserRouter,Routes} from 'react-router-dom'
import Home from './components/Home/Home'
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'
import Links from './components/Home/Links'
function App() {
  return (
    <>
    <BrowserRouter>

      <Routes>
        <Route path='/' exact element={<Home/>} />
        
        <Route path='/signup' exact element={<Signup/>} />
        
        <Route path='/login' exact element={<Login />} />
        
        <Route path='/links' exact element={<Links/>} />
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App


