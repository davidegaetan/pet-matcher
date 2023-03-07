import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [allErrors, setAllErrors] = useState({});
    const validatedForm = 'mt-2 border-top border-bottom border-2 p-5 was-validated d-flex justify-content-center flex-column';
    const notValidatedForm = 'mt-2 border-top border-bottom border-2 p-5 d-flex justify-content-center flex-column';
    const [formValidation, setFormValidation] = useState(notValidatedForm);
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        // setFormValidation(validatedForm);
        axios.post('http://localhost:8080/api/user/login/', {
            email,
            password
        }, { withCredentials: true, credentials: 'include' })
            .then(res => {
                console.log(res, "res")
                navigate("/home");
            })
            .catch(err => {
                console.log(err.response, "err.response")
                setAllErrors(err.response)
            })
    }

    return (
        <div className='col-lg-6 col-md-8 m-auto'>
            <div className='d-flex justify-content-center m-5'>
                <h1 >Mascota Matcher</h1>
            </div>
            <form className={formValidation}>
                <div className=''>
                    <div className=''>
                        {allErrors.data ? <div id="test" className='text-danger'> {allErrors.data.error}</div> : <div></div>}
                        <label htmlFor="email" >Email</label>
                        <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} className='form-control' />


                        <label htmlFor="password" >Password</label>
                        <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} className='form-control' />

                    </div>
                </div>
                <div className='d-flex justify-content-center'>
                    <button type="submit" className='mt-3 btn btn-primary ' onClick={login}>Log in</button>
                </div>

            </form>
            <div className='d-flex justify-content-center m-5'>
            <button className='btn'><NavLink to={"/user/new"} >Create an account</NavLink></button>
            </div>
        </div>
    )
}

export default Login