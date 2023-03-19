import {IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import TodoLists from "../../components/TodoLists";
import React from "react";
import {personCircle, search} from 'ionicons/icons';
import QuickLists from "../../components/QuickLists";
import {Divider} from "@mui/material";

const Home: React.FC = () => {
    const pageStyle = {userSelect: 'none'}
    return (
        <IonPage style={pageStyle}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton>
                            <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
                        </IonButton>
                    </IonButtons>
                    <IonTitle>{"Immortal Todo"}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton routerLink="/search">
                            <IonIcon slot="icon-only" icon={search}></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <QuickLists></QuickLists>
                <Divider style={{marginLeft: 16, marginRight: 16, marginTop: 10, marginBottom: 10}}></Divider>
                <TodoLists></TodoLists>
            </IonContent>
        </IonPage>
    );
};

export default Home;
