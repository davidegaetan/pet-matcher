import React, {useState, useEffect, useMemo, useRef} from 'react'
import { useParams } from 'react-router-dom';
import styles from './Match.module.css'
import axios from 'axios';
import TinderCard from 'react-tinder-card'
import confetti from 'canvas-confetti'
import { Container } from '@mui/system';
import { Typography, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
const Match = () => {
    const [pet, setPet]=useState("")
    const { petId } = useParams();
    const [pets, setPets]=useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [lastDirection, setLastDirection] = useState()
    const [gotaMatch, setgotaMatch]= useState(false);
    // used for outOfFrame closure
    const currentIndexRef = useRef(currentIndex)
    
useEffect(()=>{
    axios.get(`http://localhost:8080/api/pets/${petId}`)
            .then(res => {
                console.log(res.data.Pets)
                setPet(res.data.Pets)
            })
            .catch(err => console.log(err))
},[])
useEffect(()=>{
    console.log(pet.petType)
    axios.get(`http://localhost:8080/api/pets/match/${pet.petType}`)
        .then(res => {
            setPets(res.data.Pets.filter((mas,index)=>(mas.userId!==pet.userId._id && !pet.possibleMatches.includes(mas._id)))) //que se muestre solo los pets de otros usuarios
            setCurrentIndex(res.data.Pets.length - 1)
        })
        .catch(err => console.log(err))
},[pet])

const childRefs = useMemo(
    () =>
      Array(pets.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }


  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
    setgotaMatch(false)
  }

  
  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

 
  const distance = (location1, location2)=>{
        //haversine formula
        var R = 6371.0710; // Radius of the Earth in miles
        var rlat1 = location1.lat * (Math.PI/180); // Convert degrees to radians
        var rlat2 = location2.lat * (Math.PI/180); // Convert degrees to radians
        var difflat = rlat2-rlat1; // Radian difference (latitudes)
        var difflon = (location2.lng- location1.lng) * (Math.PI/180); // Radian difference (longitudes)
  
        var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
        return Math.round(d);
      
}


  const onMatchRequest = (e,masco,index)=>{
    console.log("onmatch")
        const iden = masco._id;
        const posiblesMatches = masco.possibleMatches;
        const matches = masco.matches
        //busca si en sus posibles matches esta el id del pet
         if (posiblesMatches.includes(pet._id) ){
            console.log("We have a match")
            //se cargan los ids en ambas mascotas 
            if (!matches.includes(pet._id) && !gotaMatch){ // en caso de que ya exista un match anterior al mismo id que no se duplique 
                console.log("entro a agregar match")
            let nuevoarray = pet.matches
            nuevoarray.push(iden)
            setPet({...pet, matches: nuevoarray})
            axios.put(`http://localhost:8080/api/pets/${petId}/edit`, 
            {...pet, matches: nuevoarray}
        , {withCredentials:true})
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            }) 
            nuevoarray = masco.matches
            nuevoarray.push(petId)
            axios.put(`http://localhost:8080/api/pets/${iden}/edit`, 
            {...masco, matches: nuevoarray}
        , {withCredentials:true})
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            }) }
            //alguna animacion cool
            confetti();
            setgotaMatch(true)
        }else{
            //se coloca entre posibles matches
            let nuevoarray = pet.possibleMatches
            nuevoarray.push(iden)
            setPet({...pet, possibleMatches: nuevoarray})
            axios.put(`http://localhost:8080/api/pets/${petId}/edit`, 
            {...pet, possibleMatches: nuevoarray}
        , {withCredentials:true})
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            }) 
        } 
  }

  return (
        <Container maxWidth="xl" className={styles.container}>
            <Typography variant='h3' className={styles.title}>Match your pet with others</Typography>
            <div className={styles.tinderContainer}>
                <div className={styles.cardContainer}>
                    {pets.map((character, index) => (
                    <TinderCard
                        ref={childRefs[index]}
                        className={styles.swipe}
                        key={character._id}
                        onSwipe={(dir) => swiped(dir, character.name, index)}
                        onCardLeftScreen={() => outOfFrame(character.name, index)}
                    >
                        <Card className={styles.card}>
                            <CardMedia
                                sx={{ height: 600, maxHeight: "90vw", position: "relative" }}
                                image={character.imgUrl}
                                title={character?.name}
                            >
                                <CardContent className={styles.cardContent}>
                                    <Typography gutterBottom variant="h5" component="div" className={styles.cardName}>
                                        {character?.name}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5, mt: 0 }} color="text.secondary">
                                        A {distance(pet.location, character.location)} km
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {character.skill1} | {character.skill2} | {character.skill3}
                                    </Typography>
                                </CardContent>
                            </CardMedia>
                            
                            <CardActions>
                                <Button className={styles.match} variant='contained' onClick={(e)=>onMatchRequest(e,character,index)}><FavoriteIcon sx={{mr:"5px"}}/> Match</Button>
                            </CardActions>
                        </Card>
                        
                    </TinderCard>
                    ))}
                </div>
                {gotaMatch ? (
                    <Typography variant='h3' className={styles.h2per}> You have got a match!!!</Typography>
                ) : ("")
                }
                {lastDirection ? (
                    <Typography variant='h5' key={lastDirection} className={`${styles.infoText}`}>
                    You swiped {lastDirection}
                    </Typography>
                ) : (
                    <Typography variant='h5' className={`mt-4 ${styles.h2per} ${styles.infoText}`}>
                    Swipe a card!
                    </Typography>
                )}
            </div>

        </Container>
  )
}

export default Match