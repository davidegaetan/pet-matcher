import React, {useState} from 'react'
import axios from 'axios'
const CheckMatches = ({pet}) => {
    const [matches, setMatches]=useState([])
    const [mactive, setMactive]= useState(false)
    const [clickstatus, setClickstatus]=useState(false)

    const handleClick =()=>{
        //pregunta si el array matches esta vacio
        clickstatus ? setClickstatus(false) : setClickstatus(true)
        let arraym = [];
        let arraymatches = pet.matches;
        if (arraymatches.length){
            for ( let i = 0; i<arraymatches.length; i++){
                let id = arraymatches[i];
                axios.get(`http://localhost:8080/api/pets/${id}`)
                .then(res=>{
                    console.log(res)
                    arraym.push(res.data.Pets)
                    setMatches(arraym)
                    setMactive(true)
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        }else{
            setMactive(false)
            console.log(`esta vacio`)
        }

    }
  return (
    <div>
        <button className='btn btn-primary' onClick={handleClick}>Ver matches</button>
        { clickstatus ? ( <>
        {   mactive ? (
            matches.map((m,index)=>{return(<div className='container' key={`${m._id + index}`}>
                <p>Nombre : {m.name}</p>
                <p>Informacion de contacto : {m.userId.email}</p>
            </div>)})
        ) : ("No tienes matches con esta mascota")

        } </>) : ("") }
    </div>
  )
}

export default CheckMatches