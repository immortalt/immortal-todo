import React from "react";
import {IonIcon, IonItem, IonLabel} from "@ionic/react";
import {calendarOutline, checkmarkOutline, infiniteOutline, starOutline, sunnyOutline} from 'ionicons/icons';

const QuiskLists: React.FC = () => {
    return (
        <>
            <IonItem button detail={false}
                     lines="none">
                <IonIcon icon={sunnyOutline} slot="start"></IonIcon>
                <IonLabel>{"My Day"}</IonLabel>
                <IonLabel slot="end">{10}</IonLabel>
            </IonItem>
            <IonItem button detail={false}
                     lines="none">
                <IonIcon icon={starOutline} slot="start"></IonIcon>
                <IonLabel>{"Important"}</IonLabel>
                <IonLabel slot="end">{10}</IonLabel>
            </IonItem>
            <IonItem button detail={false}
                     lines="none">
                <IonIcon icon={calendarOutline} slot="start"></IonIcon>
                <IonLabel>{"Planned"}</IonLabel>
                <IonLabel slot="end">{10}</IonLabel>
            </IonItem>
            <IonItem button detail={false}
                     lines="none">
                <IonIcon icon={checkmarkOutline} slot="start"></IonIcon>
                <IonLabel>{"Finished"}</IonLabel>
                <IonLabel slot="end">{10}</IonLabel>
            </IonItem>
            <IonItem button detail={false}
                     lines="none">
                <IonIcon icon={infiniteOutline} slot="start"></IonIcon>
                <IonLabel>{"Tasks"}</IonLabel>
                <IonLabel slot="end">{10}</IonLabel>
            </IonItem>
        </>
    )
        ;
};

export default QuiskLists;
