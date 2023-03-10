import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Login from './Login';
import PetList from './Pets/pet-list';

const AllPets = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/pets')
            .then(res => {
                setPets(res.data.Pets)
            })
            .catch(err => console.log(err))
    }, [])
    console.log("pets", pets)

    return (
        <div className='col-lg-6 col-md-8 col-sm-12 col- m-auto'>
            <div className='d-flex justify-content-between mt-2 ms-2 ms-md-0'>
                <h1 >Mascota Matcher</h1>
                <div>
                    <Login/>
                </div>
            </div>
            <div className=' mb-3'>
                <h4 className='mt-2 ms-2 ms-md-0'>Check out these pets</h4>
            </div>
            <div className='mt-2  pt-3'>

                <PetList pets={pets} />

            </div>
        </div>
    )
}

export default AllPets