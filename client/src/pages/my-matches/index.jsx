import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CheckMatches from '../../components/Mymatches';
import { Grid } from '@mui/material';
import PetCard from '../../components/Pets/pet-card';
const Mymatches = () => {

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
    <Grid container spacing={2} >
            {
                pets.map((pet, id) => {
                    return (
                    <Grid item xs={12} lg={6} key={`${id} ${pet.name}`} >
                        <PetCard pet={pet} PetActions={()=><></>} />
                        <CheckMatches pet={pet}/>
                    </Grid>)
                })
            }
    </Grid>
  )
}

export default Mymatches