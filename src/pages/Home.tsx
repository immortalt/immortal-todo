import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './Home.css';
import DragList from "../components/DragList";

const Home: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{"immortal Todo"}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <DragList></DragList>
            </IonContent>
        </IonPage>
    );
};

export default Home;
