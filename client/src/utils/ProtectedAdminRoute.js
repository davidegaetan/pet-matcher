import { useEffect, useState } from "react";
import {Navigate, useLocation} from "react-router-dom"
import axios from 'axios';

const ProtectedAdminRoute = ({children}) => {
    const [status, setStatus] = useState("Loading")
    const location = useLocation();

    useEffect(()=>{
        // verificar si esta logeado
        axios.get("http://localhost:8080/api/user/admin/check",
        {withCredentials: true}
        )
        .then((res)=>{
            console.log("Protected route component",res?.data)
            setStatus("Logueado")
        })
        .catch((err)=>{
            console.log("Protected route component err",err);
            setStatus("Not")
        })
    }, [])
    if(status === "Not"){
        return <Navigate to="/user/login" state={{ from: location}} replace />
    }else if(status === "Logueado"){
        return children
    }else{
        return (
            <div>Loading</div>
    )}
    
};

export default ProtectedAdminRoute;