import { IonButton, IonContent, IonPage } from "@ionic/react";
import NavBar from "../components/NavBar";
import { useAuth } from "../contexts/AuthContext";
import { Redirect } from "react-router";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Map } from "../types/Map.types";
import MapListing from "../components/MapListing";

export default function Dashboard() {
    const {currentUser,isadmin}=useAuth()
    const [UserMapsData,setUserMapsData]=useState<Map[]>([])
    
    useEffect(()=>{
        axios.get(`http://localhost:5000/maps/${currentUser?.email}`)
        .then(res => {setUserMapsData(res.data)}).
        catch(err => console.log(err))
    },[])

    if (!currentUser) {
      return <Redirect to="/Login" />;
    }

    return (
    <>
    <IonPage>
      <NavBar/>
        <IonContent fullscreen>
            <p>{currentUser?.displayName} {currentUser?.email} Dashboard Page</p>
            <p>Posiadane mapy</p>
            {
                UserMapsData.length>0 && UserMapsData.map((map:Map,index)=><MapListing map={map} key={index}/>)
            }
            <a href="/NewMapForm"><IonButton>Stworz nowa mape</IonButton></a>
            {/* <img src={UserMapsData && `http://localhost:5000/${UserMapsData[0]?.Pictures[0]}`}></img> */}
            {isadmin && <><a href="/MapsVerification"><IonButton>Sprawdz mapy oczekujace weryfikacji</IonButton></a></>}
        </IonContent>
    </IonPage>
  </>
  )}