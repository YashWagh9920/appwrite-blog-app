import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite_services/auth'
import {logout} from "../../Store/authSlice"
import { removepost } from '../../Store/postSlice'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = ()=>{
    authService.logout()
    .then(()=>{
      dispatch(logout());
      dispatch(removepost());
      navigate('/');
    })
  }
    

  return (
    <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
    onClick={()=> logoutHandler()}>
      Logout</button>
  )
}

export default LogoutBtn
