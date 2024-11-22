import React,{ useState,useEffect } from 'react'
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import './App.css'
import GoogleLogin from './GoogleLogin'
import Dashboard from './pages/Dashboard'
import NotFoundPage from './NotFoundPage'
import {GoogleOAuthProvider} from '@react-oauth/google'
import RefreshHandeler from './RefreshHandeler'
import { Header } from './pages/Header'
import { Profile } from './pages/Profile'


function App() {
  // const navigate=useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const GoogleAuthWrapper=()=>{
      return(
        <GoogleOAuthProvider clientId="752824440559-uid92q8f173kiposgma3j989jjg7h2si.apps.googleusercontent.com">
        <GoogleLogin></GoogleLogin>
      </GoogleOAuthProvider> 
      )
  }

  const PrivateRoute =({element})=>{
    return isAuthenticated ? element : <Navigate to="/login" />
  }
  return (
    <BrowserRouter>
    {/* <Header/> */}
    <RefreshHandeler setIsAuthenticated={setIsAuthenticated}/>
    {/* <Header/> */}
    <Routes>
      <Route path='/login' element={<GoogleAuthWrapper/>}></Route>
      <Route path="/" element={<Navigate to="/login"/>}></Route>
      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard/>}/>}/>
      <Route path='*' element={<NotFoundPage/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
