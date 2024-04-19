import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import 'leaflet/dist/leaflet.css';
import { LatLng, latLng } from "leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import ShopMarker from "./ShopMarker";
import {Service} from "../types/Service.types"

export default function ServicesMap() {

    const [data,setData]=useState<Service[]>([])

    useEffect(()=>{
        axios.get("http://localhost:5000/services")
        .then(res => setData(res.data)).
        catch(err => console.log(err))
    },[])

    const center:LatLng = latLng(51.935442596086354, 15.505764603525249)

    return (
        <MapContainer style={{height:"100%"}} center={center} zoom={13} scrollWheelZoom={true} >
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                data.length>0 && data.map((service:Service,index)=><ShopMarker service={service} key={index}/>)
            }
        </MapContainer>
    )
}
