import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Typography, Container } from '@mui/material';
import PetList from '../../components/Pets/pet-list'
import PetActions from './pet-actions'

function Home() {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/pets')
            .then(res => {
                setPets(res.data.Pets)
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <Container maxWidth="xl">
            <Typography variant='h3' sx={{textAlign: "center", mb: 3}}>
                All pets
            </Typography>

            <PetList pets={pets} PetActions={PetActions} />
        </Container>
    )
}

export default Home;