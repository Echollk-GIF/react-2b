import React from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../views/Home/Home'
import Login from '../views/Login/Login'

export default function IndexRouter () {
  return (
    <HashRouter>
      <Routes>
        <Route path="/*" element={localStorage.getItem("token") ? <Home /> : <Navigate to="/login" />} />
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </HashRouter>
  )
}
