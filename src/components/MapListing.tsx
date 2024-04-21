import { LatLng, LatLngTuple, latLng } from "leaflet";
import { Map } from "../types/Map.types";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";

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
        <div style={{maxWidth:"40%",height:"400px",backgroundColor:"green"}}>
            <MapContainer style={{height:"90%"}} center={center} zoom={12} scrollWheelZoom={false} zoomControl={false}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Polyline pathOptions={{color:"blue"}} positions={coordinates} />
            </MapContainer>
            <p><span>{map.TrackName.charAt(0).toUpperCase() + map.TrackName.slice(1)}  Length: {(distanceInKm)}km Elevation up: 
            {map.posElevation.valueOf()} Elevation down: {map.negElevation.valueOf()}</span></p>
        </div>
  )
}