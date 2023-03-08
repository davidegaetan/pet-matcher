import React, {useMemo, useState} from 'react'
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

const Mymap = (props) => {

    const [location, setLocation]=useState({
        lat: 0,
        lng: 0
    })

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCtQJCjd2giZ7NDH5lmT0HURUpMFj0oivw"
      });
    const center = useMemo(()=>({lat: -25, lng: -57.7}),[]);// para evitar que re-renderice el centro del map
      
    const handleClick = (evento)=>{
        setLocation({
           lat : evento.latLng.lat(),
           lng : evento.latLng.lng()
    })
        props.onNewLocation({
            lat : evento.latLng.lat(),
            lng : evento.latLng.lng()
        });
      
    }

 // This returns while map is being loaded
if (!isLoaded) return <div>Loading...</div>
return (
    <GoogleMap 
        zoom={3}
        center={center} 
        mapContainerClassName='map-container'
        onClick={handleClick}>
        <MarkerF position={location} />
    </GoogleMap>
    )
}

export default Mymap