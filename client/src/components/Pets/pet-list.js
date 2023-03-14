import { Grid } from "@mui/material";
import PetCard from "./pet-card";
import DefaultPetActions from './default-pet-actions';

function PetList({pets, PetActions = DefaultPetActions}) {
    return ( <Grid container spacing={2} >
        {
        pets.map((pet, id) => {
            return (
            <Grid item xs={12} lg={6} key={`${id} ${pet.name}`} >
                <PetCard pet={pet} PetActions={PetActions} />
            </Grid>)
        })
        }
    </Grid> );
}

export default PetList;