import React, { useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import Mymap from './Mymap';
const url = 'https://api.cloudinary.com/v1_1/dnzb74gp9/image/upload';
const preset = 'i4xdjohv';
const NewPet = () => {
    const navigate = useNavigate();
    const [skill1, setSkill1] = useState()
    const [skill2, setSkill2] = useState()
    const [skill3, setSkill3] = useState()
    const [name, setName] = useState();
    const [imgUrl, setImgUrl] = useState();
    const [image, setImage] = useState('');
    const [petType, setPetType] = useState();
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [allErrors, setAllErrors] = useState({});
    const validatedForm = 'mt-2 p-3 was-validated';
    const notValidatedForm = 'mt-2 p-3';
    const [formValidation, setFormValidation] = useState(notValidatedForm);
    const liftLocation = (loc)=>{
        setLocation(loc)
    }

    const sendData=(url)=>{
        console.log(url)
        setImgUrl(url)
        axios.post('http://localhost:8080/api/pets/new/', {
            name,
            petType,
            description,
            location,
            skill1,
            skill2,
            skill3,
            likes: 0,
            imgUrl: url,
            approved: false
        }, {withCredentials:true})
            .then(res => {
                console.log(res)
                navigate("/home", {replace: true});
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
    const newPet = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', preset);
        axios.post(url, formData).then(res=>{
            console.log(res)
            sendData(res.data.secure_url);
        }
        ).catch(err=>{
            console.log(err)
        })
        
    }

    return (
        <div className='col-lg-6 col-md-8 m-auto'>
            <form className={formValidation}>
                <div className='row'>
                    <div className='col w-100'>
                        <label htmlFor="name" >Pet Name</label>
                        <input type="text" name="name" id="name" onChange={e => setName(e.target.value)} className='form-control' required minLength="3" />
                        {allErrors.name ? <div className='invalid-feedback'> {allErrors.name.message}</div> : <div></div>}
                        <div className="mb-3">
                        <label htmlFor="petType" >Pet Type</label>
                            <select className='form-select'name="petType" id='petType' onChange={e=>setPetType(e.target.value)}>
                                <option>Select your Pet Type</option>
                                <option value="Perro">Perro</option>
                                <option value="Gato">Gato</option>
                            </select>
                            {allErrors.petType ? <div className='invalid-feedback'> {allErrors.petType.message}</div> : <div></div>}
                        </div>
                        <label htmlFor="description" >Description</label>
                        <input type="text" name="description" id="description" onChange={e => setDescription(e.target.value)} className='form-control' required minLength="3" />
                        {allErrors.description ? <div className='invalid-feedback'> {allErrors.description.message}</div> : <div></div>}
                        <label htmlFor="skill-1" >Skill 1:</label>
                        <input type="text" name="skill-1" id="skill-1" onChange={e => setSkill1(e.target.value)} className='form-control' />
                        <label htmlFor="skill-2" >Skill 2:</label>
                        <input type="text" name="skill-2" id="skill-2" onChange={e => setSkill2(e.target.value)} className='form-control' />
                        <label htmlFor="skill-3" >skill 3:</label>
                        <input type="text" name="skill-3" id="skill-3" onChange={e => setSkill3(e.target.value)} className='form-control' />
                    </div>
                    <div className='col'>
                        <label htmlFor='location' className='form-label'>Pet's location :</label>
                        <Mymap onNewLocation={liftLocation} className="form-control"/> 
                        <label htmlFor="img" >Pic of your pet</label>
                        <input type="file" accept="image/png, image/gif, image/jpeg, image/jpg" name="img" id="img" onChange={e => setImage(e.target.files[0])} className='form-control' />
                    </div>
                </div>
                <button type="submit" className='mt-3 btn btn-primary' onClick={newPet}>Add Pet</button>
                
            </form>
        </div>
    )
}

export default NewPet