import { LatLng, LatLngTuple, latLng } from "leaflet";
import { Map } from "../types/Map.types";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";

interface Props{
    map:Map
    key:number
}
//inny sposob const ShopMarker:React.FC<Props>=({service,key})=> a potem export default na koncu pliku
export default function MapListing(Props:Props) {
    const {map}=Props
    const distanceInKm = (map.Distance.valueOf() / 1000).toFixed(2);
    const center:LatLng = latLng(51.935442596086354, 15.505764603525249)

    const coordinates: LatLngTuple[] = map.RoutePoints.map((point:number[]) => [point[0], point[1]]);
  return (
        <div style={{width:"40%",height:"600px",backgroundColor:"green",margin:"10px"}}>
            <MapContainer style={{height:"90%"}} center={center} zoom={12}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Polyline pathOptions={{color:"blue"}} positions={coordinates} />
            </MapContainer>
            <Link to={{
                pathname: '/MapPage',
                state: { map: map }
                }} style={{textDecoration:"none",color:"inherit"}}>
                    <div style={{height:"10%",paddingLeft:"10px"}}>
                        <p><span>{map.TrackName}  Length: {(distanceInKm)}km Elevation up: 
                        {map.posElevation.valueOf().toFixed(2)}m Elevation down: {map.negElevation.valueOf().toFixed(2)}m</span></p>
                    </div>
            </Link>
        </div>
)}