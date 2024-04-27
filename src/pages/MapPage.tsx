import { LatLng, LatLngTuple, latLng } from 'leaflet';
import { Map } from '../types/Map.types';
import { MapContainer, Polyline, TileLayer, useMap } from 'react-leaflet';
import { useLocation } from 'react-router';
import { IonButton, IonContent, IonPage } from '@ionic/react';
import NavBar from '../components/NavBar';
import { useRef, useState } from 'react';
import leftarrow from '../images/left-arrow.png';
import rightarrow from '../images/right-arrow.png';
import axios from 'axios';

interface stateType {
    map:Map
 }


export default function MapPage() {
    const location = useLocation<stateType>();
    const [map,setmap] = useState(location.state ? location.state.map : null)
    const distanceInKm = map ? (map.Distance.valueOf() / 1000).toFixed(2) : '';
    const center:LatLng = latLng(51.935442596086354, 15.505764603525249)
    const coordinates: LatLngTuple[] = map ? map.RoutePoints.map((point:number[]) => [point[0], point[1]]) : [];
    const [currentStartIndex, setCurrentStartIndex] = useState(0);
    const zdjeciaref=useRef<HTMLInputElement>(null)
    const [message,setMessage]=useState<string>('')
    const [loading,setLoading]=useState<boolean>(false)

    const handleNext = () => {
        setCurrentStartIndex(prevIndex => prevIndex + 1);
    };

    const handlePrev = () => {
        setCurrentStartIndex(prevIndex => Math.max(prevIndex - 1, 0));
    };

    async function handleSend(e:any) {
        e.preventDefault();
        setMessage("")
        setLoading(true)
        const zdjecia = zdjeciaref.current?.files;
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
        const data = new FormData();
        data.append('id', map!._id);
        data.append('TrackName', map!.TrackName);
        if(zdjecia){
            Array.from(zdjecia).forEach((zdjecie) => {
                data.append('zdjecia', zdjecie);
            })
        }
        axios.put(`http://localhost:5000/maps/addpictures/${map!._id}`,data,{
            headers: {
             'Content-Type': 'multipart/form-data',
             },
            })
        .then(res => {
            {res.data.message ? 
                <>
                {setMessage(res.data.message) }
                {axios.get(`http://localhost:5000/maps/getmapbyid/${map!._id}`)
                .then(res => {setmap(res.data)}).
                catch(err => console.log(err))}
                </>: 
            setMessage("Zdjęcia zostały dodane pomyslnie") 
            }
            setLoading(false)
         })
        .catch(err => {
            console.log(err)
            setMessage("Wystąpił błąd")
            setLoading(false)
        })
    }

  return (
    <>
    <IonPage>
      <NavBar/>
        <IonContent fullscreen>
        {map && 
        <>
            <div style={{width:"100%",display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <h2>{map.TrackName} Created by: {map.Creator}</h2>
                <div style={{width:"90%",height:"500px"}}>
                    <MapContainer style={{height:"100%"}} center={center} zoom={12}>
                        <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Polyline pathOptions={{color:"blue"}} positions={coordinates} />
                    </MapContainer>
                </div>
            </div>
            <div>
                <h4>Length: {(distanceInKm)}km</h4>
                <h4>Elevation up: {map.posElevation.valueOf().toFixed(2)}m</h4>
                <h4>Elevation down: {map.negElevation.valueOf().toFixed(2)}m</h4>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{display:"flex",flexDirection:"row",width:"60%",alignItems: "center", justifyContent: "center"}}>
                    <button style={{width:"5%"}} onClick={handlePrev} disabled={currentStartIndex === 0}><img src={leftarrow} alt='leftarrow'></img></button>
                    <div style={{display: 'flex', overflow: 'hidden',width:"90%"}}>
                        {map.Pictures.slice(currentStartIndex, currentStartIndex + 5).map((picture, index) => (
                            <img src={`http://localhost:5000/${picture}`} alt={"zdjecie"+index} key={index} style={{width: '20%'}} />
                        ))}
                    </div>
                    <button style={{width:"5%"}} onClick={handleNext} disabled={currentStartIndex + 5 >= map.Pictures.length}><img src={rightarrow} alt='rightarrow'></img></button>
                </div>
            </div>
            <p>Add more pictures: <input type="file" ref={zdjeciaref} multiple/> (tylko pliki png i jpg)</p>
            <IonButton disabled={loading} onClick={handleSend}>Dodaj nowe zdjecia</IonButton>
            {message && <p>{message}</p>}
            </>}
        </IonContent>
    </IonPage>
    </>
  )
}

