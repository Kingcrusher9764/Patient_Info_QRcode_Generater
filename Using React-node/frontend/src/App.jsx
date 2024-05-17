import { useState } from 'react'
import Home from './Components/Home/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./App.css"
import NotFound from './Components/NotFound/NotFound'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route 
              path="/"
              element={
                <Home />
              }
            />
            <Route 
              path='/register'
              element={<Register />}
            />
            <Route 
              path='/login'
              element={<Login />}
            />
            <Route 
              path='*'
              element={<NotFound />}
            />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
