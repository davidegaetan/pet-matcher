import React, { useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'

const NewPet = () => {
    const navigate = useNavigate();
    const [skill1, setSkill1] = useState()
    const [skill2, setSkill2] = useState()
    const [skill3, setSkill3] = useState()
    const [name, setName] = useState();
    const [imgUrl, setImgUrl] = useState();
    const [petType, setPetType] = useState();
    const [description, setDescription] = useState("");
    const [allErrors, setAllErrors] = useState({});
    const validatedForm = 'mt-2 border-top border-2 p-3 was-validated';
    const notValidatedForm = 'mt-2 border-top border-2 p-3';
    const [formValidation, setFormValidation] = useState(notValidatedForm);

    const newPet = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/pets/new/', {
            name,
            petType,
            description,
            skill1,
            skill2,
            skill3,
            likes: 0,
            imgUrl,
            approved: false
        }, {withCredentials:true})
            .then(res => {
                console.log(res)
                navigate("/");
            })
            .catch(err => {
                console.log(err.response.status, "err.response.status")
                if(err.response.status !== 401){
                    setFormValidation(validatedForm);
                    setAllErrors(err.response.data.errors)
                }else{
                    alert("You must log in to add a new pet")
                }
            })
    }

    return (
        <div className='col-lg-6 col-md-8 m-auto'>
            <div className='d-flex justify-content-between mt-2 ms-2 ms-md-0'>
                <h1 >Just Pet Pics</h1>
                <NavLink to={"/"} >back to home</NavLink>
            </div>
            <div className=' mb-3 ms-2 ms-md-0'>
                <h4 className='mt-2'>Know a pet needing a home?</h4>
            </div>
            <form className={formValidation}>
                <div className='row'>
                    <div className='col'>
                        <label htmlFor="name" >Pet Name</label>
                        <input type="text" name="name" id="name" onChange={e => setName(e.target.value)} className='form-control' required minLength="3" />
                        {/* {allErrors.name ? <div className='invalid-feedback'> {allErrors.name.message}</div> : <div></div>} */}
                        <label htmlFor="petType" >Pet Type</label>
                        <input type="text" name="petType" id="petType" onChange={e => setPetType(e.target.value)} className='form-control' required minLength="3" />
                        {/* {allErrors.petType ? <div className='invalid-feedback'> {allErrors.petType.message}</div> : <div></div>} */}
                        <label htmlFor="description" >Description</label>
                        <input type="text" name="description" id="description" onChange={e => setDescription(e.target.value)} className='form-control' required minLength="3" />
                        {/* {allErrors.description ? <div className='invalid-feedback'> {allErrors.description.message}</div> : <div></div>} */}
                        <label htmlFor="imgUrl" >Img Url</label>
                        <input type="text" name="imgUrl" id="imgUrl" onChange={e => setImgUrl(e.target.value)} className='form-control' />
                    </div>
                    <div className='  col'>
                        <label htmlFor="skill-1" >Skill 1:</label>
                        <input type="text" name="skill-1" id="skill-1" onChange={e => setSkill1(e.target.value)} className='form-control' />
                        <label htmlFor="skill-2" >Skill 2:</label>
                        <input type="text" name="skill-2" id="skill-2" onChange={e => setSkill2(e.target.value)} className='form-control' />
                        <label htmlFor="skill-3" >skill 3:</label>
                        <input type="text" name="skill-3" id="skill-3" onChange={e => setSkill3(e.target.value)} className='form-control' />
                    </div>
                </div>
                <button type="submit" className='mt-3 btn btn-primary' onClick={newPet}>Add Pet</button>

            </form>
        </div>
    )
}

export default NewPet