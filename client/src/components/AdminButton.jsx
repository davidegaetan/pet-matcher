import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
const AdminButton = () => {
    const [loginCheck, setLoginCheck] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:8080/api/user/admin/check', {withCredentials:true})
            .then(res => {
                setLoginCheck(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <>
            {loginCheck ?  <button className='btn'><NavLink to={"/admin/approve"} >admin portal</NavLink> </button>  : <><button className='btn'><NavLink to={"/"} >admin portal</NavLink> </button></>}
        </>
    )
}

export default AdminButton