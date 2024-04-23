import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Map } from "../types/Map.types";
import axios from 'axios';
import MapListingForAdmin from '../components/MapListingForAdmin';
import { IonContent, IonPage } from '@ionic/react';
import NavBar from '../components/NavBar';
import { Redirect } from 'react-router';

export default function MapsVerification() {
    const {currentUser,isadmin}=useAuth()
    const [unverifiedMaps,setunverifiedMaps]=useState<Map[]>([])
    
    useEffect(()=>{
        axios.get(`http://localhost:5000/maps/${currentUser?.email}`)
        .then(res => {setunverifiedMaps(res.data)
        console.log(res.data)}).
        catch(err => console.log(err))
    },[])

    useEffect(()=>{
        axios.get(`http://localhost:5000/maps`)
        .then(res => {console.log(res.data)}).
        catch(err => console.log(err))
    },[])
    


    if (!currentUser) {
      return <Redirect to="/Login" />;
    }

    if(!isadmin){
        <Redirect to="/Home" />
    }

    return (
    <>
    <IonPage>
      <NavBar/>
        <IonContent fullscreen>
            <p>{currentUser?.displayName} {currentUser?.email} Dashboard Page</p>
            <p>Posiadane mapy</p>
            {
                unverifiedMaps.length>0 && unverifiedMaps.map((map:Map,index)=><MapListingForAdmin map={map} key={index}/>)
            }
        </IonContent>
    </IonPage>
  </>
  )
}
