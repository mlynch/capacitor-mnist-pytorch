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
import Mnist from "../mnist";
import { AppStore } from "../store";
import { getResizedImage } from "../utils";
import "./Home.css";

const Home: React.FC = () => {
  const clear = AppStore.useState(s => s.clear);
  const ctx = AppStore.useState(s => s.ctx);

  const handleClear = () => {
    AppStore.update(s => {
      s.clear = true;
      return s;
    });
  }
  const handleGuess = async () => {
    console.log('Guessing');
    if (ctx) {
      console.log(ctx.canvas.toDataURL('image/png'));
      const scaled = await getResizedImage(ctx.canvas, 96);
      const { value } = await Mnist.infer({ image: scaled });
      console.log(value);
    }
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
