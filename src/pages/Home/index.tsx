import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem, IonLabel,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import TodoLists from "../../components/TodoLists";
import React from "react";
import {
    calendarOutline,
    checkmarkOutline,
    infiniteOutline,
    personCircle,
    search,
    starOutline,
    sunnyOutline
} from 'ionicons/icons';
import {Divider} from "@mui/material";
import {RouteComponentProps} from "react-router";
import {Link} from "react-router-dom";

const preventDefault = (e: any) => e.preventDefault();
const Home: React.FC<RouteComponentProps> = (props) => {
    const pageStyle = {userSelect: 'none'}
    return (
        <IonPage style={pageStyle}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onTouchEnd={preventDefault}>
                            <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
                        </IonButton>
                    </IonButtons>
                    <IonTitle>{"Immortal Todo"}</IonTitle>
                    <IonButtons slot="end">
                        <Link to="/search">
                            <IonButton>
                                <IonIcon slot="icon-only" icon={search}></IonIcon>
                            </IonButton>
                        </Link>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonItem routerLink="/search" button detail={false}
                         lines="none">
                    <IonIcon icon={sunnyOutline} slot="start"></IonIcon>
                    <IonLabel>{"My Day"}</IonLabel>
                    <IonLabel slot="end">{10}</IonLabel>
                </IonItem>
                <IonItem button detail={false}
                         lines="none" routerLink="/search">
                    <IonIcon icon={starOutline} slot="start"></IonIcon>
                    <IonLabel>{"Important"}</IonLabel>
                    <IonLabel slot="end">{10}</IonLabel>
                </IonItem>
                <IonItem button detail={false}
                         lines="none" routerLink="/search">
                    <IonIcon icon={calendarOutline} slot="start"></IonIcon>
                    <IonLabel>{"Planned"}</IonLabel>
                    <IonLabel slot="end">{10}</IonLabel>
                </IonItem>
                <IonItem button detail={false}
                         lines="none" routerLink="/search">
                    <IonIcon icon={checkmarkOutline} slot="start"></IonIcon>
                    <IonLabel>{"Finished"}</IonLabel>
                    <IonLabel slot="end">{10}</IonLabel>
                </IonItem>
                <IonItem button detail={false}
                         lines="none" routerLink="/search">
                    <IonIcon icon={infiniteOutline} slot="start"></IonIcon>
                    <IonLabel>{"Tasks"}</IonLabel>
                    <IonLabel slot="end">{10}</IonLabel>
                </IonItem>
                <Divider style={{marginLeft: 16, marginRight: 16, marginTop: 10, marginBottom: 10}}></Divider>
                <TodoLists></TodoLists>
            </IonContent>
        </IonPage>
    );
};

export default Home;
