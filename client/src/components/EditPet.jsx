import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate, useParams } from 'react-router-dom'

const EditPet = () => {
    const navigate = useNavigate();
    const [details, setDetails] = useState({})
    const { petId } = useParams();
    const [skill1, setSkill1] = useState(details.skill1)
    const [skill2, setSkill2] = useState(details.skill2)
    const [skill3, setSkill3] = useState(details.skill3)
    const [name, setName] = useState(details.name);
    const [petType, setPetType] = useState(details.petType);
    const [description, setDescription] = useState(details.description);
    const [imgUrl, setImgUrl] = useState();
    const [allErrors, setAllErrors] = useState({});
    const validatedForm = 'mt-2 border border-dark border-2 p-3 was-validated';
    const notValidatedForm = 'mt-2 border border-dark border-2 p-3';
    const [formValidation, setFormValidation] = useState(notValidatedForm);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/pets/${petId}`)
            .then(res => {
                console.log(res)
                setDetails(res.data.Pets)
            })
            .catch(err => console.log(err))
    }, [])


    const editAPet = (e) => {
        e.preventDefault();
        setFormValidation(validatedForm);
        axios.put(`http://localhost:8080/api/pets/${petId}/edit`, {
            name,
            petType,
            description,
            skill1,
            skill2,
            skill3,
            imgUrl
        }, {withCredentials:true})
            .then(res => {
                console.log(res)
                navigate("/")
            })
            .catch(err => {
                console.log(err)
                setAllErrors(err.response.data.errors)
            })
    }

    return (
        <div className='col-lg-6 col-md-8 m-auto'>
            <div className='d-flex justify-content-between mt-2 ms-2 ms-md-0'>
                <h1 >Mascota Matcher</h1>
                <button className='btn'><NavLink to={"/"} >back to home</NavLink></button>
            </div>
            <div className=' mb-3'>
                <h4 className='mt-2 ms-2 ms-md-0'>Edit {details.name}</h4>
            </div>
            <form className={formValidation}>
                <div className='row'>
                    <div className='col'>
                        <label htmlFor="name" >Pet Name</label>
                        <input type="text" name="name" id="name" onBlur={e => setName(e.target.value)} onChange={e => setName(e.target.value)} defaultValue={details.name} className='form-control' required minLength="3" />
                        {allErrors.name ? <div className='invalid-feedback'> {allErrors.name.message}</div> : <div></div>}
                        <label htmlFor="petType" >Pet Type</label>
                        <input type="text" name="petType" id="petType" onBlur={e => setPetType(e.target.value)} onChange={e => setPetType(e.target.value)} defaultValue={details.petType} className='form-control' required minLength="3" />
                        {allErrors.petType ? <div className='invalid-feedback'> {allErrors.petType.message}</div> : <div></div>}
                        <label htmlFor="description" >Description</label>
                        <input type="text" name="description" id="description" onBlur={e => setDescription(e.target.value)} onChange={e => setDescription(e.target.value)} defaultValue={details.description} className='form-control' required minLength="3" />
                        {allErrors.description ? <div className='invalid-feedback'> {allErrors.description.message}</div> : <div></div>}
                        <label htmlFor="imgUrl" >Img Url</label>
                        <input type="text" name="imgUrl" id="imgUrl" onChange={e => setImgUrl(e.target.value)} defaultValue={details.imgUrl} className='form-control' />
                    </div>
                    <div className='col'>
                        <label htmlFor="skill-1" >Skill 1:</label>
                        <input type="text" name="skill-1" id="skill-1" onChange={e => setSkill1(e.target.value)} defaultValue={details.skill1} className='form-control' />
                        <label htmlFor="skill-2" >Skill 2:</label>
                        <input type="text" name="skill-2" id="skill-2" onChange={e => setSkill2(e.target.value)} defaultValue={details.skill2} className='form-control' />
                        <label htmlFor="skill-3" >skill 3:</label>
                        <input type="text" name="skill-3" id="skill-3" onChange={e => setSkill3(e.target.value)} defaultValue={details.skill3} className='form-control' />
                    </div>
                </div>
                <button type="submit" onClick={editAPet} className='mt-3 btn btn-primary'>Save Changes</button>
            </form>
        </div>
    )
}

export default EditPet