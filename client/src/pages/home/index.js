import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Typography, Container } from '@mui/material';
import PetList from '../../components/Pets/pet-list'

function Home() {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/user/pets/',
            { withCredentials: true })
            .then(res => {
                console.log(res, "res")
                setPets(res.data.Pets)
            })
            .catch(err => console.log(err, "err"))
    }, [])


    return (
        <Container maxWidth="xl">
            <Typography variant='h3' sx={{textAlign: "center", mb: 3}}>
                All your pets
            </Typography>

            <PetList pets={pets} />
        </Container>
    )
}

export default Home;