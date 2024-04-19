import { IonContent, IonPage } from "@ionic/react";
import NavBar from "../components/NavBar";
import ServicesMap from "../components/ServicesMap";

export default function Services() {
  return (
    <>
    <IonPage>
      <NavBar/>
        <IonContent fullscreen>
            <ServicesMap/>
        </IonContent>
    </IonPage>
  </>
  )
}
