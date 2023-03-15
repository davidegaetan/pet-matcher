import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import UserLogout from './UserLogout'
import AdoptPetButton from './AdoptPetButton'
import Login from './Login'

const PetDetails = () => {
    const [details, setDetails] = useState({})
    const [like, setLike] = useState()
    const [liked, setLiked] = useState(false)
    const { petId } = useParams();
    const [newComment, setNewComment] = useState("")
    const [allComments, setAllComments] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8080/api/pets/${petId}`)
            .then(res => {
                setDetails(res.data.Pets)
                setAllComments(res.data.Pets.comments)
            })
            .catch(err => console.log(err))
    }, [])

    const sendComment = (e) => {
        
        console.log(newComment, "newComment")
        axios.put(`http://localhost:8080/api/pets/${petId}/comment/new`,
            {
                details,
                newComment
            }, { withCredentials: true })
            .then(res => {
                console.log(res)
                setAllComments(res.data.Pet.comments)
            })
            .catch(err => {
                console.log(err)
                alert("You must log in to leave a comment")

            })
    }

    const likeButton = (e) => {
        if (!liked) {
            const newLike = details.likes + 1
            axios.put(`http://localhost:8080/api/pets/${petId}/edit`, {
                ...details,
                likes: newLike
            }, { withCredentials: true })
                .then(res => {
                    setLike(newLike)
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                    alert("You must log in to like a Pet")
                })
            axios.get(`http://localhost:8080/api/pets/${petId}/likes`
                , { withCredentials: true })
                .then(res => {
                    console.log(res.data.Pets.likes, "res.data.Pets.likes")
                    console.log(newLike, "newLike")
                    setDetails(res.data.Pets)
                    setLiked(true);
                })
                .catch(err => console.log(err))


        }

    }

    return (
        <div className='col-lg-6 col-md-8 m-auto'>
            <div className='mt-2 border  border-2 p-3 d-flex'>
                <div className='mt-2 mb-3  w-50 d-flex flex-column'>
                    <div>

                        <h5>Pet Type: {details.petType}</h5>
                        <h5>Description: {details.description}</h5>
                        <div>
                            {
                                details.skill1 || details.skill2 || details.skill3 ? <h5>Skills:</h5> : <></>

                            }
                            <ul >
                                {
                                    details.skill1 ? <li><h5>{details.skill1}</h5></li> : <></>
                                }
                                {
                                    details.skill2 ? <li><h5>{details.skill2}</h5></li> : <></>
                                }
                                {
                                    details.skill3 ? <li><h5>{details.skill3}</h5></li> : <></>
                                }
                            </ul>
                            <div className=''>
                                {!liked ? details.likes : like} like(s)
                            </div>
                            <button className='btn btn-success' onClick={likeButton}>Like</button>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <h5>Comments:</h5>
                        <div  className='d-flex flex-column align-items-start m-2 '>
                        { allComments.length > 0 ? 
                    allComments.map((comment, id) => {
                        return (
                            <div className=' p-2 ms-3 me-3 col-10' key={id + "comment"}>
                                <strong>{comment.commentBy}</strong>: {comment.comment}
                            </div>)
                    }) : <div></div>
                }
                        </div>
                        <form className='d-flex flex-column pe-3' onSubmit={sendComment}>
                            <label className='form-label' htmlFor="comment">Leave a comment:</label>
                            <textarea className='form-control mb-2' name="comment" id="comment" onChange={e => setNewComment(e.target.value)}></textarea>
                            <button className='btn btn-primary w-auto' type="submit">Send comment</button>
                        </form>
                    </div>
                </div>
                <div className='mt-2 mb-3 w-50 flex-wrap'>
                    {
                        details.imgUrl ? <img src={details.imgUrl} alt="pet" className='w-100' /> : <img src="http://www.clipartbest.com/cliparts/xTg/ojp/xTgojpXXc.jpeg" alt="pet" className='w-100' />
                    }
                </div>
            </div>
        </div>
    )
}

export default PetDetails