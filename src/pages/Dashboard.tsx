import { IonButton, IonContent, IonPage } from "@ionic/react";
import NavBar from "../components/NavBar";
import { useAuth } from "../contexts/AuthContext";
import { Redirect } from "react-router";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Map } from "../types/Map.types";
import MapListing from "../components/MapListing";
import GpxParser from "gpxparser";

export default function Dashboard() {
    const {currentUser}=useAuth()
    const zdjeciaref=useRef<HTMLInputElement>(null)
    const [error,setError]=useState<string>('')
    const [loading,setLoading]=useState<boolean>(false)
    const gpxfileref=useRef<HTMLInputElement>(null)
    const nazwaref=useRef<HTMLInputElement>(null)
    const [UserMapsData,setUserMapsData]=useState<Map[]>([])
    
    
    useEffect(()=>{
        axios.get(`http://localhost:5000/maps/${currentUser?.email}`)
        .then(res => {setUserMapsData(res.data)
        console.log(res.data)}).
        catch(err => console.log(err))
    },[])



    if (!currentUser) {
      return <Redirect to="/Login" />;
    }

    async function handleSend(e:any) {
        e.preventDefault();
        setLoading(true)
        const nazwaTrasy = nazwaref.current?.value;
        const zdjecia = zdjeciaref.current?.files;
        const plikGPX = gpxfileref.current?.files?.[0];
        const useremail = currentUser?.email
        if(!nazwaTrasy || !plikGPX) {
            setError('Proszę wypełnić nazwę trasy i wybrać plik GPX.');
            setLoading(false);
            return;
        }
        if(!useremail) {
            setError('Proszę sie zalogowac');
            setLoading(false);
            return;
        }
        if(zdjecia){
            if(zdjecia.length>5){
                setError("Nie mozna dodac wiecej niz 5 zdjec na raz")
                setLoading(false)
                return;
            }
            const allowedTypes=["image/jpeg","image/png"]
            var arefilesvalid:boolean=true
            Array.from(zdjecia).forEach((zdjecie) => {
                if(!allowedTypes.includes(zdjecie.type)){
                    arefilesvalid=false
                }
            })
            if(!arefilesvalid){
                setError("Niepoprawny format plikow zdjeciowych")
                setLoading(false)
                return
            }
        }
        if(!plikGPX.name.endsWith(".gpx")){
            setError("Niepoprawny format pliku trasy")
            setLoading(false)
            return
        }
        const formData = new FormData();
        formData.append('TrackName', nazwaTrasy);
        if(useremail){
        formData.append('Creator', currentUser?.email);
        if(zdjecia){
            Array.from(zdjecia).forEach((zdjecie) => {
                formData.append(`pictures`, zdjecie);
            });
        }
        formData.append('plikGPX', plikGPX);
        //console.log(formData)
        try {
              const response = await axios.post('http://localhost:5000/maps', formData, {
                 headers: {
                  'Content-Type': 'multipart/form-data',
                 },
               });
               //console.log('Odpowiedź serwera:', response.data);
               {response.data.massage ? setError(response.data.message) : 
                setError("Trasa przeslana pomyslnie") 
               }
         } catch (error) {
               console.error('Błąd podczas wysyłania żądania:', error);
           }
          setLoading(false);
     }
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
            <p>Tworzenie mapy</p>
            <p>Nazwa trasy:<input type="text" ref={nazwaref}/>-wymagane</p>
            <p>Zdjecia tu:<input type="file" ref={zdjeciaref} multiple/> (tylko pliki png i jpg)</p>
            <p>Plik gpx tu:<input type="file" ref={gpxfileref}/>-wymagane<br/>
            Utworz swoj plik tutaj: <a href="https://gpx.studio/l/pl/" target="_blank">https://gpx.studio/l/pl/</a></p>
                <br />
            <IonButton disabled={loading} onClick={handleSend}>Utworz nowa mape</IonButton>
            {error && <p>{error}</p>}
        </IonContent>
    </IonPage>
  </>
  )}