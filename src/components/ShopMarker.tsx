import { Icon} from "leaflet"
import { Marker,Popup } from "react-leaflet"
import bicycle from "../images/bike-shop.png"
import {Service} from "../types/Service.types"

interface Props{
    service:Service
    key:number
}
//inny sposob const ShopMarker:React.FC<Props>=({service,key})=> a potem export default na koncu pliku
export default function ShopMarker(Props:Props) {
    const {service,key}=Props
    const bicycle_icon=new Icon({
        iconUrl:bicycle,
        iconSize:[40,40]
    })
    const latitude = parseFloat(service.latitude);
    const longitude = parseFloat(service.longitude);
  return (
        <Marker key={key} position={[latitude,longitude]} icon={bicycle_icon}>
            <Popup>
                Nazwa: {service.name} <br /> 
                Adres: {service.address}<br /> 
                Telefon: {service.phone_number}<br /> 
                {service.internet_page && <>Strona: <a href={service.internet_page} target="_blank">{service.internet_page}</a><br /> </>}
                <a href={service.google_link}>Link do Map Google</a>
            </Popup>
        </Marker>
  )
}

