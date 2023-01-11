import React from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '../views/Login/Login'
import SandBox from '../views/SandBox/SandBox'

export default function IndexRouter () {
  return (
    <HashRouter>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path="/*" element={localStorage.getItem("token") ? <SandBox /> : <Navigate to="/login" />} />
      </Routes>
    </HashRouter>
  )
}
