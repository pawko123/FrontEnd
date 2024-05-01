
import { Event } from '../types/Event.types'

interface Props {
    event: Event,
    key: number
}
export default function EventListing(Props: Props) {
    const event:Event= Props.event
  return (
    <div style={{width:'70%'}}>
        <h1>{event.title}</h1>
        <div style={{ display: 'flex' }}>
            <img src={`http://localhost:5000/eventpictures/${event.image}`} alt={event.title} style={{ maxWidth: '20%', maxHeight: '100%', objectFit: 'contain'}} />
            <div style={{ marginLeft: '10px' }}>
                <p dangerouslySetInnerHTML={{ __html: event.description }}></p>
                <p>Data: {new Date(event.eventdate).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
                <p>Godzina: {event.eventtime}</p>
                <p>Lokalizacja: {event.location}</p>
                <p>Organizator: {event.organizer}</p>
            </div>
        </div>
    </div>
  )
}
