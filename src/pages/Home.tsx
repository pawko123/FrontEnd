import { IonButton,  IonPage } from '@ionic/react';
import './Home.css';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  
  return (
    <IonPage>
        <IonButton href='/Login' style={{maxWidth: '400px' }}>Halo</IonButton>
    </IonPage>
  );
};

export default Home;
