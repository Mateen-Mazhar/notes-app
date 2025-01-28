import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import NoPageFound from '../Misc/NoPageFound'
import Register from './register'
import Login from './Login'
import ForgotPassword from './ForgotPassword'

const Auth = () => {
  return (
   <main>
     <Routes>
        <Route index element={<Navigate to="/auth/login"/>}></Route>
        <Route path='register' element={<Register/>}></Route>
        <Route path='login' element={<Login/>}></Route>
        <Route path='forgot-password' element={<ForgotPassword/>}></Route>
        <Route path='*' element={<NoPageFound/>}></Route>

    </Routes>
   </main>
  )
}

export default Auth
