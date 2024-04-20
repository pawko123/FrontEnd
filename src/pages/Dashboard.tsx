import { IonButton, IonContent, IonPage } from "@ionic/react";
import NavBar from "../components/NavBar";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Dashboard() {
    const {currentUser}=useAuth()
    const history = useHistory()
    const zdjeciaref=useRef<HTMLInputElement>(null)
    const [error,setError]=useState<string>('')
    const [loading,setLoading]=useState<boolean>(false)
    const gpxfileref=useRef<HTMLInputElement>(null)
    const nazwaref=useRef<HTMLInputElement>(null)

    useEffect(() => {
      if (!currentUser) {
        history.push('/Login');
      }
    }, [currentUser, history]);

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
        if(zdjecia){
            if(zdjecia.length>5){
                setError("Nie mozna dodac wiecej niz 5 zdjec na raz")
                setLoading(false)
                return;
            }
        }
        const formData = new FormData();
        formData.append('TrackName', nazwaTrasy);
        if(useremail){
        formData.append('Creator', currentUser?.email);
        if(zdjecia){
            Array.from(zdjecia).forEach((zdjecie, index) => {
                formData.append(`pictures`, zdjecie);
            });
        }
        formData.append('plikGPX', plikGPX);
        setLoading(false);
        try {
             const response = await axios.post('http://localhost:5000/maps', formData, {
               headers: {
                 'Content-Type': 'multipart/form-data',
               },
             });
             console.log('Odpowiedź serwera:', response.data);
           } catch (error) {
             console.error('Błąd podczas wysyłania żądania:', error);
           }
    }
}

  return (
    <>
    <IonPage>
      <NavBar/>
        <IonContent fullscreen>
            <p>{currentUser?.displayName} {currentUser?.email} Dashboard Page</p>
            <p>Posiadane mapy</p>
            <p>Tworzenie mapy</p>
            <p>Nazwa trasy:<input type="text" ref={nazwaref}/>-wymagane</p>
            <p>Zdjecia tu:<input type="file" ref={zdjeciaref} multiple/></p>
            <p>Plik gpx tu:<input type="file" ref={gpxfileref}/>-wymagane<br/>
            Utworz swoj plik tutaj: <a href="https://gpx.studio/l/pl/" target="_blank">https://gpx.studio/l/pl/</a></p>
                <br />
            <IonButton disabled={loading} onClick={handleSend}>Utworz nowa mape</IonButton>
            {error && <p>{error}</p>}
        </IonContent>
    </IonPage>
  </>
  )}