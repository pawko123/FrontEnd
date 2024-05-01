
import { IonButton, IonContent, IonPage } from "@ionic/react";
import NavBar from "../components/NavBar";
import { useAuth } from "../contexts/AuthContext";
import { Redirect } from "react-router";
import { useEffect, useRef, useState } from "react";
import axios from "axios";


export default function NewEventForm() {
    const {currentUser}=useAuth();
    const [isadmin,setisadmin]=useState<boolean>(false);
    const nazwaref=useRef<HTMLInputElement>(null);
    const opisref=useRef<HTMLTextAreaElement>(null);
    const dataref=useRef<HTMLInputElement>(null);
    const godzinaref=useRef<HTMLInputElement>(null);
    const lokacjaref=useRef<HTMLInputElement>(null);
    const zdjecieref=useRef<HTMLInputElement>(null);
    const organizatorref=useRef<HTMLInputElement>(null);
    const [loading,setLoading]=useState<boolean>(false);
    const [message,setMessage]=useState<string>("");

    useEffect(()=>{
        axios.get(`http://localhost:5000/admins/${currentUser?.email}`)
        .then(res => {setisadmin(res.data.isAdmin)
            if(!isadmin){
                return <Redirect to="/home" />
            }
        }).
        catch(err => console.log(err))
    })

    async function handlesend(){
        setMessage("");
        setLoading(true);
        const nazwa=nazwaref.current?.value;
        const opis=opisref.current?.value;
        const data=dataref.current?.value;
        const godzina=godzinaref.current?.value;
        const lokacja=lokacjaref.current?.value;
        const zdjecie=zdjecieref.current?.files?.[0];
        const organizator=organizatorref.current?.value;
        if(!nazwa || !opis || !data || !godzina || !lokacja || !zdjecie || !organizator){
            setMessage("Wypelnij wszystkie pola")
            setLoading(false);
            return;
        }
        if(zdjecie){
            const allowedTypes=["image/jpeg","image/png"]
            if(!allowedTypes.includes(zdjecie.type)){
                setMessage("Niepoprawny format pliku zdjeciowego")
                setLoading(false);
                return;
            }
        }
        const formData=new FormData();
        formData.append("title",nazwa);
        formData.append("description",opis);
        formData.append("eventdate",data);
        formData.append("eventtime",godzina);
        formData.append("location",lokacja);
        formData.append("picture",zdjecie);
        formData.append("organizer",organizator);
        axios.post("http://localhost:5000/events",formData)
        .then(res => {console.log(res)
        setMessage(res.data.message)})
        .catch(err => console.log(err))
        setLoading(false);
    }
  return (
    <>
    <IonPage>
      <NavBar/>
      <IonContent fullscreen>
        Tworzenie eventu
        <p>Tytul eventu:<input type="text" ref={nazwaref}/></p>
        <p>Organizator eventu:<input type="text" ref={organizatorref}/></p>
        <p>Opis Eventu:</p>
        <textarea rows={26} cols={100} ref={opisref}>Opis eventu</textarea>
        <p>Data Eventu:<input type="date" ref={dataref}/></p>
        <p>Godzina Eventu:<input type="time" ref={godzinaref}/></p>
        <p>Lokalizacja Eventu:<input type="text" ref={lokacjaref}/></p>
        <p>Zdjecie Eventu:<input type="file" ref={zdjecieref}/></p>
        <IonButton onClick={handlesend}>Stworz Event</IonButton>
        {message && <p>{message}</p>}
      </IonContent>
    </IonPage>
    </>
  )
}