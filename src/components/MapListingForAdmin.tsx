import { LatLng, LatLngTuple, latLng } from "leaflet";
import { Map } from "../types/Map.types";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import { useAuth } from "../contexts/AuthContext";
import { IonButton } from "@ionic/react";
import { useEffect, useState } from "react";
import axios from "axios";

interface Props{
    map:Map
    key:number
}
//inny sposob const ShopMarker:React.FC<Props>=({service,key})=> a potem export default na koncu pliku
export default function MapListingForAdmin(Props:Props) {
    const {isadmin}=useAuth()
    const {map}=Props
    const [isInteresting, setIsInteresting] = useState(map.instresting);
    const [isVisible, setIsVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const distanceInKm = (map.Distance.valueOf() / 1000).toFixed(2);
    const center:LatLng = latLng(51.935442596086354, 15.505764603525249)

    useEffect(() => {
        setLoading(true);
        axios.put(`http://localhost:5000/maps/toggleInteresting/${map._id}`)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
        setLoading(false);
    }, [isInteresting]);
    
    
    const toggleInteresting = () => {
        setIsInteresting(!isInteresting);
    };

    const handleverify = () => {
        setIsVisible(!isVisible);
        setLoading(true);
        axios.put(`http://localhost:5000/maps/verifymap/${map._id}`)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
        setLoading(false);
    };

    const handledeny = () => {
        setIsVisible(!isVisible);
        setLoading(true);
        axios.delete(`http://localhost:5000/maps/deletemap/${map._id}`)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
        setLoading(false);
    };
    
    const coordinates: LatLngTuple[] = map.RoutePoints.map((point:number[]) => [point[0], point[1]]);
    
  return (
    <>
    {isVisible && <>
        <div style={{display:"flex"}}>
            <div style={{width:"50%",height:"600px",backgroundColor:"green"}}>
                <MapContainer style={{height:"80%"}} center={center} zoom={12}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polyline pathOptions={{color:"blue"}} positions={coordinates} />
                </MapContainer>
                <p><span>{map.TrackName}  Length: {(distanceInKm)}km Elevation up: 
                {map.posElevation.valueOf().toFixed(2)}m Elevation down: {map.negElevation.valueOf().toFixed(2)}m Verified: {map.verified ? <>prawda</> : <>falsz</>}</span></p>
                {isadmin && !map.verified && <>
                <IonButton onClick={handleverify}>Verify</IonButton>
                <IonButton onClick={handledeny}>Deny</IonButton>
                {isInteresting ? 
                <IonButton disabled={loading} onClick={toggleInteresting}>Remove Intreesting Status</IonButton> 
                : <IonButton disabled={loading} onClick={toggleInteresting}>Set as Intreesting</IonButton>}
                </>}
            </div>
            <div style={{width:"50%",height:"600px"}}>
                <p>Images:</p>
                {map.Pictures.length>0 && map.Pictures.map((picture:string,index)=><img key ={index} src={`http://localhost:5000/${picture}`} alt="zdjecie trasy" style={{width:"20%"}}/>)}
            </div>
        </div>
    </>}
    </>
  )
}