import { Link } from 'react-router-dom';
import { Button, CardActions } from '@mui/material';

function DefaultPetActions({pet}) {
    return ( 
        <CardActions>
            <Link to={"/pets/" + pet._id} relative="/"><Button size="small">View</Button></Link>
            <Link to={"/pets/" + pet._id + "/edit"} relative="/"><Button size="small">Edit</Button></Link>
            <Button size="small">Delete</Button>
            <Link to={"/pets/" + pet._id + "/match"} relative="/"><Button size="small">Match</Button></Link>
        </CardActions> );
}

export default DefaultPetActions;