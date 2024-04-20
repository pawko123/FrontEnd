import { Icon} from "leaflet"
import { Marker,Popup } from "react-leaflet"
import wrench from "../images/wrenchlogo.png"
import {AutoRepair} from "../types/AutoRepair.types"

interface Props{
    autorepair:AutoRepair
    key:number
}
//inny sposob const ShopMarker:React.FC<Props>=({autorepair,key})=> a potem export default na koncu pliku
export default function AutoRepairMarker(Props:Props) {
    const {autorepair,key}=Props
    const wrench_icon=new Icon({
        iconUrl:wrench,
        iconSize:[40,40]
    })
    const latitude = parseFloat(autorepair.latitude);
    const longitude = parseFloat(autorepair.longitude);
  return (
        <Marker key={key} position={[latitude,longitude]} icon={wrench_icon}>
            <Popup>
                Nazwa: {autorepair.name} <br /> 
                Adres: {autorepair.address}<br />
                <a href={autorepair.google_link}>Link do Map Google</a>
            </Popup>
        </Marker>
  )
}