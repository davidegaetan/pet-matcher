import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom'

const NewUser = () => {
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [allErrors, setAllErrors] = useState({});
    const validatedForm = 'mt-2 border-top border-2 p-3 was-validated';
    const notValidatedForm = 'mt-2 border-top border-2 p-3';
    const [formValidation, setFormValidation] = useState(notValidatedForm);
    const navigate = useNavigate();

    const newUser = (e) => {
        e.preventDefault();
        setFormValidation(validatedForm);
        axios.post('http://localhost:8080/api/user/new/', {
            fname,
            lname,
            userName,
            email,
            password,
            admin: false
        })
            .then(res => {
                console.log(res)
                alert("User created! Please log in with your new account.")
                navigate("/home", {replace: true});
            })
            .catch(err => {
                console.log(err, "err")
                setAllErrors(err.response.data.errors)


            })
    }

    return (
        <div className='col-lg-6 col-md-8 m-auto'>
            <div className='d-flex justify-content-between mt-2 ms-2 ms-md-0'>
                <h1 >Mascota Matcher</h1>
                <button className='btn'><NavLink to={"/"} >back to home</NavLink></button>
            </div>
            <div className=' mb-3 ms-2 ms-md-0'>
                <h4 className='mt-2'>Create a user</h4>
            </div>
            <form className={formValidation}>
                <div className='row'>
                    <div className='col'>
                        <label htmlFor="fname" >First Name</label>
                        <input type="text" name="fname" id="fname" onChange={e => setFname(e.target.value)} className='form-control' required/>
                        {/* {allErrors.fname ? <div className='invalid-feedback'> {allErrors.fname.message}</div> : <div></div>} */}

                        <label htmlFor="lname" >Last Name</label>
                        <input type="text" name="lname" id="lname" onChange={e => setLname(e.target.value)} className='form-control' required/>
                        {/* {allErrors.lname ? <div className='invalid-feedback'> {allErrors.lname.message}</div> : <div></div>} */}

                        <label htmlFor="userName" >User Name</label>
                        <input type="text" name="userName" id="userName" onChange={e => setUserName(e.target.value)} className='form-control' required/>
                        {/* {allErrors.lname ? <div className='invalid-feedback'> {allErrors.userName.message}</div> : <div></div>} */}

                        <label htmlFor="email" >Email</label>
                        <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} className='form-control' required/>
                        {/* {allErrors.email ? <div className='invalid-feedback'> {allErrors.email.message}</div> : <div></div>} */}

                        <label htmlFor="password" >Password</label>
                        <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} className='form-control' required minLength="8" />
                        {/* {allErrors.name ? <div className='invalid-feedback'> {allErrors.password.message}</div> : <div></div>} */}

                        {/* <label htmlFor="confirm-password" >Password</label>
                        <input type="confirm-password" name="confirm-password" id="confirm-password" onChange={e => setPassword(e.target.value)} className='form-control' required minLength="8" />
                        {allErrors.name ? <div className='invalid-feedback'> {allErrors.password.message}</div> : <div></div>} */}
                    </div>
                </div>
                <button type="submit" className='mt-3 btn btn-primary' onClick={newUser}>Create User</button>

            </form>
        </div>
    )
}

export default NewUser