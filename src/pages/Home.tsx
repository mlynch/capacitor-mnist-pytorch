import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import DrawCanvas from "../components/DrawCanvas";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Digits</IonTitle>
          </IonToolbar>
        </IonHeader>
        <DrawCanvas />
      </IonContent>
    </IonPage>
  );
};

export default Home;
