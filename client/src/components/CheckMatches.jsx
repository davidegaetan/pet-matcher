import React, {useState} from 'react'
import axios from 'axios'
const CheckMatches = ({pet}) => {
    const [matches, setMatches]=useState([])
    const [mactive, setMactive]= useState(false)
    const [clickstatus, setClickstatus]=useState(false)

    const handleClick =()=>{
        clickstatus ? setClickstatus(false) : setClickstatus(true)
        let arraym = [];
        let promises= [];
        let arraymatches = pet.matches;
        //pregunta si el array matches esta vacio
        if (arraymatches.length){
            for ( let i = 0; i<arraymatches.length; i++){
                let id = arraymatches[i];
                promises.push(
                axios.get(`http://localhost:8080/api/pets/${id}`)
                .then(res=>{
                    console.log(res)
                    arraym.push(res.data.Pets)
                    
                })
                .catch(err=>{
                    console.log(err)
                }))
            }
            Promise.all(promises).then(()=>{
                setMatches(arraym)
                setMactive(true)
            })
            
            
        }else{
            setMactive(false)
            console.log(`esta vacio`)
        }

    }
  return (
    <div className='d-flex flex-column align-items-center'>
        {!clickstatus ? (<button className='btn btn-primary' onClick={handleClick}>Ver matches</button>) : ("")}
        <div className='d-flex flex-row w-50'>
        { clickstatus ? ( <>
        {   mactive ? (
            matches.map((m,index)=>{return(
            <div className='container' key={`${m._id + index}`}>
                <div className="card my-2" style={{width: `18 rem`}}>
                    <img src={m.imgUrl} className="card-img-top" alt={`imagen de ${m.name}`}/>
                    <div className="card-body">
                        <h5 className="card-title">{m.name}</h5>
                        <p className="card-text">Skill1 : {m.skill1}</p>
                        <p className="card-text">Skill2 : {m.skill2}</p>
                        <p className="card-text">Skill3 : {m.skill3}</p>
                        <p className="card-text">Informacion de contacto : {m.userId.email}</p>
                    </div>
                    </div>
            </div>)})
       ) : ("No tienes matches con esta mascota")

        } </>) : ("") }</div>
    </div>
  )
}

export default CheckMatches