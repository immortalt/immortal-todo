import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import TodoLists from "../../components/TodoLists";
import React, {useEffect} from "react";
import {
    personCircle,
    search,
} from 'ionicons/icons';
import {Divider} from "@mui/material";
import {Link} from "react-router-dom";
import quickLists from "../../theme/quickLists";
import {setStatusbarColor} from "../../theme/utils";
import useIsDark from "../../hooks/useIsDark";

const preventDefault = (e: any) => e.preventDefault();
const Home: React.FC = () => {
        const isDark = useIsDark();
        const itemStyle = {
            "--background-activated": isDark ? "var(--ion-color-dark-shade)" : "var(--ion-color-light-shade)",
            "--min-height": "48px"
        }
        const styles = {
            toolbar: {
                "--background": "var(--ion-background-color)"
            }
        }
        useEffect(() => {
            setStatusbarColor(isDark ? "#080808" : "#ffffff");
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isDark, window.location.href]);
        return (
            <IonPage>
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
                                <IonIcon style={{
                                    color: color,
                                    marginLeft: -3.5,
                                    marginRight: 17.5,
                                    fontSize: 22,
                                    "--ionicon-stroke-width": "45px"
                                }} icon={icon}
                                         slot="start"></IonIcon>
                                <IonLabel
                                    style={{fontWeight: 500, color: isDark ? "#E1E1E1" : "#34373C"}}>{title}</IonLabel>
                                <IonLabel style={{
                                    color: isDark ? "#939393" : "#767678",
                                    fontSize: 15
                                }} slot="end">{count}</IonLabel>
                            </IonItem>)
                    })}
                    <Divider style={{marginLeft: 16, marginRight: 16, marginTop: 10, marginBottom: 10}}></Divider>
                    <TodoLists></TodoLists>
                </IonContent>
            </IonPage>
        );
    }
;

export default Home;
