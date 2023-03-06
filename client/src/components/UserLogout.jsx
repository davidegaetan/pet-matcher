import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate, NavLink } from 'react-router-dom'
import AdminButton from './AdminButton';

const UserLogout = (props) => {
    const navigate = useNavigate();
    const [allbtns, setAllBtns] = useState(props.allbtns);

    const logOut = () => {
        axios.get(`http://localhost:8080/api/user/logout/`,
        {withCredentials: true})
            .then((res) => {
                    console.log(res)
                    navigate("/")
            })
            .catch(err => console.log(err))
    }
    return (
        <>
        {
            allbtns ? <> <button className='btn'><NavLink to={'/pets/new'}>add a pet</NavLink></button><button className='btn'><NavLink to={'/user/pets'}>your pets</NavLink></button><button className='btn text-danger' type="submit" onClick={logOut}>log out</button> <AdminButton/> </> : <> <button className='btn text-danger' type="submit" onSubmit={logOut}>log out</button> </>
        }
        </>
    )
}

export default UserLogout