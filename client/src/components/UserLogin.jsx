import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [allErrors, setAllErrors] = useState({});
    const validatedForm = 'mt-2 border-top border-2 p-3 was-validated';
    const notValidatedForm = 'mt-2 border-top border-2 p-3';
    const [formValidation, setFormValidation] = useState(notValidatedForm);
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        // setFormValidation(validatedForm);
        axios.post('http://localhost:8080/api/user/login/', {
            email,
            password
        }, {withCredentials:true, credentials:'include'})
            .then(res => {
                console.log(res, "res")
                navigate("/");
            })
            .catch(err => {
                console.log(err.response, "err.response")
                setAllErrors(err.response)
            })
    }

    return (
        <div className='col-lg-6 col-md-8 m-auto'>
        <div className='d-flex justify-content-between mt-2 ms-2 ms-md-0'>
            <h1 >Just Pet Pics</h1>
            <button className='btn'><NavLink to={"/"} >back to home</NavLink></button>
        </div>
        <div className=' mb-3 ms-2 ms-md-0'>
            <h4 className='mt-2'>Login to see your pets</h4>
        </div>
        <form className={formValidation}>
            <div className='row'>
                <div className='col'>
                    {allErrors.data ? <div id="test" className='text-danger'> {allErrors.data.error}</div> : <div></div>}
                    <label htmlFor="email" >Email</label>
                    <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} className='form-control'/>
                    

                    <label htmlFor="password" >Password</label>
                    <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} className='form-control'  />

                </div>
            </div>
            <button type="submit" className='mt-3 btn btn-primary' onClick={login}>Log in</button>

        </form>
    </div>
    )
}

export default Login