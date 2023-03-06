import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import UserLogout from './UserLogout'
const Login = () => {
    const [loginCheck, setLoginCheck] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:8080/api/user/check', {withCredentials:true})
            .then(res => {
                setLoginCheck(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            {!loginCheck ? <><button className='btn'><NavLink to={"/user/new"} >create a user</NavLink> </button>  <button className='btn'><NavLink to={"/user/login"} >log in</NavLink></button></> : <UserLogout allbtns={true}/>}
        </>
    )
}

export default Login