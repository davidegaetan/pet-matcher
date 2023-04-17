import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
const AdoptPetButton = (props) => {
    const navigate = useNavigate();
    const { petId } = useParams();

    const deletePet = () => {
        axios.delete(`http://localhost:8080/api/pets/${petId}/adopt`,
            { withCredentials: true })
            .then((res) => {
                console.log(res)
                navigate("/home")
            })
            .catch(err => {
                console.log(err)
                //("Only admins can delete Pets")
            })
    }
    return (
        <>
            <div className="container mt-4">
                <div className="row">
                    <div className="col">
                        <p> Are you sure you want to delete the pet?</p>
                    </div>
                    <div className="row">
                        <div className="col">
                            <button className='btn btn-outline-danger' type="submit" onClick={deletePet} formAction="/"><u>delete</u></button>
                        </div>
                    </div>
            </div>
            </div>
        </>
    )
}

export default AdoptPetButton