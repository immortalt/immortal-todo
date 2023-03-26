import { IonBackButton, IonButtons, IonContent, IonFooter, IonHeader, IonPage, IonToolbar } from '@ionic/react'
import React from 'react'
import { type RouteComponentProps } from 'react-router'
import './index.scss'

type TodoPageProps = RouteComponentProps<{
  id: string
}>

const EditTodoTask: React.FC<TodoPageProps> = ({ match }) => {
  const {
    id = '',
  } = match.params
  return (
    <IonPage>
      <IonHeader mode="ios" className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"
            ></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {id}
      </IonContent>
      <IonFooter mode="ios" className="ion-no-border">
        footer
      </IonFooter>
    </IonPage>
  )
}

export default EditTodoTask
