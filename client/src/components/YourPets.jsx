import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Login from './Login';
import AdoptPetButton from './AdoptPetButton';


const YourPets = () => {
    const [pets, setPets] = useState([]);


    useEffect(() => {
        console.log("useffect")
        axios.get('http://localhost:8080/api/user/pets/',
            { withCredentials: true })
            .then(res => {
                console.log(res, "res")
                setPets(res.data.Pets)
            })
            .catch(err => console.log(err, "err"))
    }, [])


    return (
        <div className='col-lg-6 col-md-8 col-sm-12 col- m-auto'>
            <div className='d-flex justify-content-between mt-2 ms-2 ms-md-0'>
                <h1 >Just Pet Pics</h1>
                <div>
                    <Login /> <button className='btn'><NavLink to={"/"} >back to home</NavLink></button>
                </div>
            </div>
            <div className=' mb-3'>
                <h4 className='mt-2 ms-2 ms-md-0'>All your pets</h4>
            </div>
            <div className='mt-2  pt-3'>

                {
                    pets.map((pet, id) => {
                        return (
                            <div className='d-sm-flex flex-column flex-sm-row justify-content-sm-around border-top border-2 pt-3 pb-3 ' key={pet + id + "div1"}>
                                <div className='w-50 m-auto p-2' key={pet + id + "div2"}>
                                    <img key={pet + id + "img"} src={pet.imgUrl} className='w-100' alt='pet profile' />
                                </div>
                                <div className='w-75 d-flex flex-column m-auto mt-sm-0 align-items-center align-items-sm-baseline p-2' key={pet + id + "div3"}>
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
                                        <div>
                                            <button className='btn'><NavLink to={"pets/" + pet._id} >view</NavLink></button> <button className='btn'><NavLink to={"/pets/" + pet._id + "/edit"} >edit</NavLink></button><AdoptPetButton/>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                    })
                }

            </div>
        </div>
    )
}

export default YourPets