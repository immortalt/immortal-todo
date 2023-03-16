import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './Home.css';
import TodoLists from "../components/TodoLists";
import React from "react";

const Home: React.FC = () => {
    const pageStyle = {userSelect: 'none'}
    return (
        <IonPage style={pageStyle}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{"immortal Todo"}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <TodoLists></TodoLists>
            </IonContent>
        </IonPage>
    );
};

export default Home;
