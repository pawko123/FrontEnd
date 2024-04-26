import { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { IonButton, IonContent, IonPage } from '@ionic/react'
import { Redirect } from 'react-router'
import axios from 'axios'
import NavBar from '../components/NavBar'

export default function NewMapForm() {
    const {currentUser}=useAuth()
    const zdjeciaref=useRef<HTMLInputElement>(null)
    const [message,setMessage]=useState<string>('')
    const [loading,setLoading]=useState<boolean>(false)
    const gpxfileref=useRef<HTMLInputElement>(null)
    const nazwaref=useRef<HTMLInputElement>(null)
    
    if (!currentUser) {
        return <Redirect to="/Login" />;
      }

      async function handleSend(e:any) {
        e.preventDefault();
        setMessage("")
        setLoading(true)
        const nazwaTrasy = nazwaref.current?.value;
        const zdjecia = zdjeciaref.current?.files;
        const plikGPX = gpxfileref.current?.files?.[0];
        const useremail = currentUser?.email
        if(!nazwaTrasy || !plikGPX) {
            setMessage('Proszę wypełnić nazwę trasy i wybrać plik GPX.');
            setLoading(false);
            return;
        }
        if(!useremail) {
            setMessage('Proszę sie zalogowac');
            setLoading(false);
            return;
        }
        if(zdjecia){
            if(zdjecia.length>5){
                setMessage("Nie mozna dodac wiecej niz 5 zdjec na raz")
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
                setMessage("Niepoprawny format plikow zdjeciowych")
                setLoading(false)
                return
            }
        }
        if(!plikGPX.name.endsWith(".gpx")){
            setMessage("Niepoprawny format pliku trasy")
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
               {response.data.message ? setMessage(response.data.message) : 
                setMessage("Trasa przeslana pomyslnie. Teraz mapa przed publicznym listingiem czeka na potwierdzenie moderacji") 
               }
         } catch (error) {
               console.error('Błąd podczas wysyłania żądania:', error);
           }
          setLoading(false);
     }
}

  return (<>
    <IonPage>
        <NavBar/>
            <IonContent>
                <p>Tworzenie mapy</p>
                <p>Nazwa trasy:<input type="text" ref={nazwaref}/>-wymagane</p>
                <p>Zdjecia tu:<input type="file" ref={zdjeciaref} multiple/> (tylko pliki png i jpg)</p>
                <p>Plik gpx tu:<input type="file" ref={gpxfileref}/>-wymagane<br/>
                Utworz swoj plik tutaj: <a href="https://gpx.studio/l/pl/" target="_blank">https://gpx.studio/l/pl/</a></p>
                    <br />
                <IonButton disabled={loading} onClick={handleSend}>Utworz nowa mape</IonButton>
                <a href='/Dashboard'><IonButton>Wroc do swojej strony glownej</IonButton></a>
                {message && <p>{message}</p>}
            </IonContent>
    </IonPage>
        </>
  )
}
