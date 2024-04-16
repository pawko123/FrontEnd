import { IonButton,  IonPage } from '@ionic/react';
import './Home.css';

export default function Home() {
  
  return (
    <IonPage>
        <IonButton href='/Login' style={{maxWidth: '400px' }}>Halo</IonButton>
    </IonPage>
  );
};
