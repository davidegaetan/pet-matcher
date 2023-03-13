import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CheckMatches from './CheckMatches';
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
    <div className='d-flex flex-column align-items-center'>
        {
                    pets.map((pet, id) => {
                        return (<>
                            {<div className='d-sm-flex flex-column flex-sm-row justify-content-sm-around border-top border-2 pt-3 pb-3 ' key={pet + id + "div1"}>
                                <div className='w-50 m-auto p-2' key={pet + id + "div2"}>
                                    <img key={pet + id + "img"} src={pet.imgUrl} className='w-50' alt='pet profile' />
                                </div>
                                <div className='w-50 d-flex flex-column m-auto mt-sm-0 align-items-center align-items-sm-baseline p-2' key={pet + id + "div3"}>
                                    <h2 key={pet + id + "name"}>{pet.name}</h2>
                                    <div key={pet + id + "description"}>{pet.description}</div>
                                    <div key={pet + id + "div4"}>
                                        {
                                            pet.skill1 || pet.skill2 || pet.skill3 ? <h5>Skills:</h5> : <></>
                                        }
                                        <ul >
                                            {
                                                pet.skill1 ? <li>{pet.skill1}</li> : <></>
                                            }
                                            {
                                                pet.skill2 ? <li>{pet.skill2}</li> : <></>
                                            }
                                            {
                                                pet.skill3 ? <li>{pet.skill3}</li> : <></>
                                            }
                                        </ul>
                                    </div>
                                    <div className='d-flex justify-content-around flex-column' key={pet + id + "link"}>
                                        <div>{pet.likes} like(s)</div>
                                        <CheckMatches className= {pet + id + "check" } pet={pet}/>
                                    </div>
                                </div>
                            </div>
                            }
                        </>)
                    })
                }
    </div>
  )
}

export default Mymatches