import { Grid } from "@mui/material";
import PetCard from "./pet-card";

function PetList({pets}) {
    return ( <Grid container spacing={2} >
        {
        pets.map((pet, id) => {
            return (
            <Grid item xs={12} lg={6} key={`${id} ${pet.name}`} >
                <PetCard pet={pet} />
            </Grid>)
        })
        }
    </Grid> );
}

export default PetList;