import React from 'react'
import authService from '../../appwrite/auth'
import { useDispatch} from 'react-redux'
import { logout } from '../../Store/authSlice'
import {useNavigate} from 'react-router-dom'

function LogoutBtn() {

    const Dispatch = useDispatch();
    const navigate = useNavigate();


    const logoutHandler = () =>{
        authService.logout()
        .then(() => {
            Dispatch(logout())
            navigate('/login')
        })
    }
  return (
    <>
        <button
            onClick={logoutHandler}
            className='button-89 logoutBtn'
        >LogOut</button>
    </>
  )
}

export default LogoutBtn