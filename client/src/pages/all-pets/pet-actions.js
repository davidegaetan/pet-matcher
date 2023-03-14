import { Link } from 'react-router-dom';
import { Button, CardActions } from '@mui/material';

function PetActions({pet}) {
    return ( 
        <CardActions>
            <Link to={"/pets/" + pet._id} relative="/"><Button size="small">View</Button></Link>
            <Button size="small">Delete</Button>
        </CardActions> );
}

export default PetActions;