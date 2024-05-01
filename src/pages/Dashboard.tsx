import { IonButton, IonContent, IonPage } from "@ionic/react";
import NavBar from "../components/NavBar";
import { useAuth } from "../contexts/AuthContext";
import { Redirect } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Map } from "../types/Map.types";
import MapListing from "../components/MapListing";

export default function Dashboard() {
    const {currentUser}=useAuth()
    const [UserMapsData,setUserMapsData]=useState<Map[]>([])
    const [isadmin,setisadmin]=useState<boolean>()
    
    useEffect(()=>{
        axios.get(`http://localhost:5000/maps/getusersmaps/${currentUser?.email}`)
        .then(res => {setUserMapsData(res.data)}).
        catch(err => console.log(err))
        console.log(currentUser?.email)
        axios.get(`http://localhost:5000/admins/${currentUser?.email}`)
        .then(res => {setisadmin(res.data.isAdmin)
        }).
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
            {isadmin ? <><a href="/MapsVerification"><IonButton>Sprawdz mapy oczekujace weryfikacji</IonButton></a></>:null}
        </IonContent>
    </IonPage>
  </>
  )}