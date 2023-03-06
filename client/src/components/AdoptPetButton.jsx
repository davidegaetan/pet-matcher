import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const AdoptPetButton = (props) => {
    const navigate = useNavigate();

    const deletePet = () => {
        axios.delete(`http://localhost:8080/api/pets/${props.details}/adopt`,
            { withCredentials: true })
            .then((res) => {
                console.log(res)
                if (props.goHome) {
                    navigate("/")
                }
            })
            .catch(err => {
                console.log(err)
                alert("Only admins can delete Pets")
            })
    }
    return (
        <>
            <button className='btn text-danger' type="submit" onClick={deletePet} formAction="/"><u>delete</u></button>
        </>
    )
}

export default AdoptPetButton