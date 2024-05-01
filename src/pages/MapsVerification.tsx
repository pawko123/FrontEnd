import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Map } from "../types/Map.types";
import axios from 'axios';
import MapListingForAdmin from '../components/MapListingForAdmin';
import { IonContent, IonPage } from '@ionic/react';
import NavBar from '../components/NavBar';
import { Redirect } from 'react-router';

export default function MapsVerification() {
    const {currentUser}=useAuth()
    const [unverifiedMaps,setunverifiedMaps]=useState<Map[]>([])
    const [isadmin,setisadmin]=useState<boolean>(false)
    
    useEffect(()=>{
        axios.get(`http://localhost:5000/admins/${currentUser?.email}`)
        .then(res => {setisadmin(res.data.isAdmin)
          if (!currentUser) {
            return <Redirect to="/Login" />;
          }
      
          if(!isadmin){
            return <Redirect to="/home" />
          }
        }).
        catch(err => console.log(err))
        axios.get('http://localhost:5000/maps/unverifiedmaps')
        .then(res => {setunverifiedMaps(res.data)}).
        catch(err => console.log(err))
    },[])


    return (
    <>
    <IonPage>
      <NavBar/>
        <IonContent fullscreen>
            <p>Mapy do weryfikacji</p>
            <div style={{width:"100%"}}>
            {
                unverifiedMaps.length>0 && unverifiedMaps.map((map:Map,index)=><MapListingForAdmin map={map} key={index}/>)
            }
            </div>
        </IonContent>
    </IonPage>
  </>
  )
}
