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
    personCircle,
    search,
} from 'ionicons/icons';
import {Divider} from "@mui/material";
import {RouteComponentProps} from "react-router";
import {Link} from "react-router-dom";
import quickLists from "../../theme/quickLists";

const preventDefault = (e: any) => e.preventDefault();
const Home: React.FC<RouteComponentProps> = () => {
    const pageStyle = {userSelect: 'none'};
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const isDark = prefersDark.matches;
    const itemStyle = {
        "--background-activated": isDark ? "var(--ion-color-dark-shade)" : "var(--ion-color-light-shade)",
        "--min-height": "48px"
    }
    const styles = {
        toolbar: {
            "--background": "var(--ion-background-color)"
        }
    }
    return (
        <IonPage style={pageStyle}>
            <IonHeader className="ion-no-border">
                <IonToolbar style={styles.toolbar}>
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
                {quickLists.map((item) => {
                    const {id, title, color, count, icon, theme} = item;
                    return (
                        <IonItem key={id} style={itemStyle} routerLink={`/todo/${id}/${theme}`} button detail={false}
                                 lines="none">
                            <IonIcon style={{color: color}} icon={icon} slot="start"></IonIcon>
                            <IonLabel>{title}</IonLabel>
                            <IonLabel slot="end">{count}</IonLabel>
                        </IonItem>)
                })}
                <Divider style={{marginLeft: 16, marginRight: 16, marginTop: 10, marginBottom: 10}}></Divider>
                <TodoLists></TodoLists>
            </IonContent>
        </IonPage>
    );
};

export default Home;
