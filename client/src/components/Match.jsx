import React, {useState, useEffect, useMemo, useRef} from 'react'
import { useParams } from 'react-router-dom';
import styles from '../styles/Match.module.css'
import axios from 'axios';
import TinderCard from 'react-tinder-card'
import confetti from 'canvas-confetti'
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
                setPet(res.data.Pets)
            })
            .catch(err => console.log(err))
},[])
useEffect(()=>{
    console.log(pet.petType)
    axios.get(`http://localhost:8080/api/pets/match/${pet.petType}`)
        .then(res => {
            console.log(res)
            setPets(res.data.Pets.filter((mas,index)=>(mas.userId!==pet.userId && !pet.possibleMatches.includes(mas._id)))) //que se muestre solo los pets de otros usuarios
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
        const iden = masco._id;
        const posiblesMatches = masco.possibleMatches;
        //busca si en sus posibles matches esta el id del pet
         if (posiblesMatches.includes(pet._id) ){
            console.log("We have a match")
            confetti();
            setgotaMatch(true)
            //se cargan los ids en ambas mascotas
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
            }) 
            //alguna animacion cool

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
        <div id={styles.main}>
            <div className={styles.app}>
            <div>
                <link
                    href='https://fonts.googleapis.com/css?family=Damion&display=swap'
                    rel='stylesheet'
                />
                <link
                    href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
                    rel='stylesheet'
                />
                <h1>Match your pet with others</h1>
                <div className={styles.cardContainer}>
                    {pets.map((character, index) => (
                    <TinderCard
                        ref={childRefs[index]}
                        className={styles.swipe}
                        key={character._id}
                        onSwipe={(dir) => swiped(dir, character.name, index)}
                        onCardLeftScreen={() => outOfFrame(character.name, index)}
                    >
                        <div
                        style={{ backgroundImage: 'url(' + character.imgUrl + ')' }}
                        className={styles.card}
                        >
                                <div className={styles.description}>
                                    <div className={`d-flex flex-row w-100 justify-content-between align-items-end `}>
                                        <div className={styles.buttons}>
                                        <button type='button'style={{ width: '70px' }} className={styles.match} onClick={(e)=>onMatchRequest(e,character,index)}>Match</button>
                                        </div>
                                        <p className='align-text-bottom'>A {distance(pet.location, character.location)} km </p>
                                        <div>
                                            <h5 className={styles.h5per}>{character.name}</h5>
                                            <h6>{character.skill1}</h6>
                                            <h6>{character.skill2}</h6>
                                            <h6>{character.skill3}</h6>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </TinderCard>
                    ))}
                </div>
                {gotaMatch ? (
                    <h2> We have got a match!!!</h2>
                ) : ("")
                }
                {lastDirection ? (
                    <h2 key={lastDirection} className={styles.infoText}>
                    You swiped {lastDirection}
                    </h2>
                ) : (
                    <h2 className={`mt-4 ${styles.infoText}`}>
                    Swipe a card !
                    </h2>
                )}
                </div>

            </div>
        </div>
  )
}

export default Match