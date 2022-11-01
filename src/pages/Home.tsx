import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import DrawCanvas from "../components/DrawCanvas";
import { AppStore } from "../store";
import "./Home.css";

const Home: React.FC = () => {
  const clear = AppStore.useState(s => s.clear);
  const handleClear = () => {
    AppStore.update(s => {
      s.clear = true;
      return s;
    });
  }
  const handleGuess = () => {
    console.log('Guessing');
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Digits</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleClear}>Clear</IonButton>
            <IonButton onClick={handleGuess}>Guess</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <DrawCanvas clear={clear} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
