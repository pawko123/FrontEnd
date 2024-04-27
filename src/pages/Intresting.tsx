import { IonContent, IonPage } from "@ionic/react";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Map } from "../types/Map.types";
import MapListing from "../components/MapListing";


export default function Intresting() {
    const [mapData, setMapData] = useState<Map[]>([])
    
    useEffect(()=>{
        axios.get(`http://localhost:5000/maps/intrestingmaps`)
        .then(res => {setMapData(res.data)}).
        catch(err => console.log(err))
      },[])
      
  return (
    <>
    <IonPage>
      <NavBar/>
      <IonContent fullscreen>
        <div style={{display:"flex",flexWrap:"wrap"}}>
            {
                mapData.length>0 && mapData.map((map:Map,index)=><MapListing map={map} key={index}/>)
            }
        </div>
      </IonContent>
    </IonPage>
    </>
  )
}
