import { MapContainer, TileLayer } from "react-leaflet"
import 'leaflet/dist/leaflet.css';
import { LatLng, latLng } from "leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import ShopMarker from "./ShopMarker";
import {Service} from "../types/Service.types"
import { AutoRepair } from "../types/AutoRepair.types";
import AutoRepairMarker from "./AutoRepairMarker";
import { useIonViewDidEnter } from "@ionic/react";

export default function ServicesMap() {

    const [Servicedata,setServiceData]=useState<Service[]>([])
    const [AutoRepairdata,setAutoRepairData]=useState<AutoRepair[]>([])

    useEffect(()=>{
        axios.get("http://localhost:5000/services")
        .then(res => setServiceData(res.data)).
        catch(err => console.log(err))
    },[])
    useEffect(()=>{
        axios.get("http://localhost:5000/autorepair")
        .then(res => setAutoRepairData(res.data)).
        catch(err => console.log(err))
    },[])

    useIonViewDidEnter(() => {
        window.dispatchEvent(new Event("resize"));
      });

    const center:LatLng = latLng(51.935442596086354, 15.505764603525249)

    return (
        <MapContainer style={{height:"100%"}} center={center} zoom={13} scrollWheelZoom={true} >
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                Servicedata.length>0 && Servicedata.map((service:Service,index)=><ShopMarker service={service} key={index}/>)
            }
            {
                AutoRepairdata.length>0 && AutoRepairdata.map((autorepair:AutoRepair,index)=><AutoRepairMarker autorepair={autorepair} key={index}/>)
            }
        </MapContainer>
    )
}
