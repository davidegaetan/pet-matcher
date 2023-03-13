import { Button, CardContent, CardMedia, CardActions, Typography, Card, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

function PetCard({pet}) {
  return (<Card sx={{ display: 'flex', maxWidth: "600px", margin: "0 auto", height: "100%" }}>
    <Grid container>
        <Grid item xs={12} sm={5}>
            <CardMedia
                component="img"
                sx={{ width: "100%" }}
                image={pet.imgUrl}
                alt={pet.name}
            />
        </Grid>
        <Grid item xs={12} sm={7} sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
                {pet.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ mb: 1.5 }}>
                {pet.petType}
            </Typography>
            <Typography variant="body2">
                {pet.description}
            </Typography>
            {
                (pet.skill1 || pet.skill2 || pet.skill3) && (<Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
                    Skills</Typography>
            )}
            {
                (pet.skill1 || pet.skill2 || pet.skill3) && (
                    <ul>
                        { pet.skill1 && <li><Typography variant="body2">{pet.skill1}</Typography></li>}
                        { pet.skill2 && <li><Typography variant="body2">{pet.skill2}</Typography></li>}
                        { pet.skill3 && <li><Typography variant="body2">{pet.skill3}</Typography></li>}
                    </ul>
            )}
            <CardActions disableSpacing>
            <Typography variant="body2" sx={{ mr: 1.5 }}>
            {    pet.likes} like(s)
            </Typography>
            <Typography variant="body2">
            {    pet.comments.length} comments(s)
            </Typography>
                </CardActions>
            <CardActions>
                <Link to={"/pets/" + pet._id} relative="/"><Button size="small">View</Button></Link>
                <Link to={"/pets/" + pet._id + "/edit"} relative="/"><Button size="small">Edit</Button></Link>
                <Button size="small">Delete</Button>
                <Link to={"/pets/" + pet._id + "/match"} relative="/"><Button size="small">Match</Button></Link>
                </CardActions>
            </CardContent>
        </Grid>
    </Grid>
        
      
    </Card>
)}

export default PetCard;