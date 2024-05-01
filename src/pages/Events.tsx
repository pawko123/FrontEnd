import { IonButton, IonContent, IonPage } from "@ionic/react";
import NavBar from "../components/NavBar";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { Event } from "../types/Event.types";
import EventListing from "../components/EventListing";


export default function Events() {
    const [isadmin,setisadmin]=useState<boolean>(false)
    const {currentUser}=useAuth()
    const [eventdata,seteventdata]=useState<Event[]>([])

    useEffect(()=>{
        console.log(currentUser?.email)
        axios.get(`http://localhost:5000/admins/${currentUser?.email}`)
        .then(res => {setisadmin(res.data.isAdmin)}).
        catch(err => console.log(err))
    },[])

    useEffect(()=>{
      axios.get('http://localhost:5000/events')
      .then(res => seteventdata(res.data))
      .catch(err => console.log(err))
    },[])


  return (
    <>
    <IonPage>
      <NavBar/>
      <IonContent fullscreen>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
          {eventdata.map((event,index)=><EventListing event={event} key={index}/>)}
        </div>
        {isadmin && <IonButton routerLink="/NewEventForm">Create Event</IonButton>}
      </IonContent>
    </IonPage>
    </>
  )
}
