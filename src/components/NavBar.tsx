import { IonButton, IonCol, IonGrid, IonHeader, IonRow, IonToolbar } from '@ionic/react'
import { useAuth } from '../contexts/AuthContext';
import logo from '../images/logo.png'
import usericon from '../images/usericon.png'


export default function NavBar() {
const {currentUser,logout}=useAuth()
async function handlelogout(){
    try {
      await logout()
    } catch {

    }
  }
  return (
    <IonHeader>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol size='0.5'>
                <a href='/'><img src={logo} style={{width:'80px'}}></img></a>
              </IonCol>
              <IonCol size='2' className='ion-text-center'>
                <a href='/' style={{fontSize:"40px",textDecoration:"none",color:"white"}}>Main Page</a>
              </IonCol>
              <IonCol size='2' className='ion-text-center'>
                <a href='/Intresting' style={{fontSize:"40px",textDecoration:"none",color:"white"}}>Intresting Tracks</a>
              </IonCol>
              <IonCol size='2' className='ion-text-center'>
                <a href='/Events' style={{fontSize:"40px",textDecoration:"none",color:"white"}}>Events</a>
              </IonCol>
              <IonCol size='2' className='ion-text-center'>
                <a href='/ServicesMap' style={{fontSize:"40px",textDecoration:"none",color:"white"}}>Service Shops</a>
              </IonCol>
              <IonCol className='ion-text-center'>
                {currentUser ? 
                <IonButton onClick={handlelogout} style={{maxWidth: '400px'}}>Wyloguj sie</IonButton>:
                <IonButton href='/Login' style={{maxWidth: '400px'}}>Zaloguj sie</IonButton>}
              </IonCol>
              <IonCol size='0.5'>
                <a href='/Dashboard'><img src={usericon} style={{width:'80px'}}></img></a>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
  )
}
