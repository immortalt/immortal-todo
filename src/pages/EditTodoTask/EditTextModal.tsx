import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonModal,
  IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import React, { useRef, useState } from 'react'

type EditTextModalProps = {
  initialValue: string
  ref: React.RefObject<HTMLIonModalElement>
  onWillDismiss: (ev: any, note: string) => void
}
const EditTextModal: React.FC<EditTextModalProps> = ({
  initialValue,
  ref: modal,
  onWillDismiss
}) => {
  const [note, setNote] = useState(initialValue)
  const input = useRef<HTMLIonTextareaElement>(null)
  return <IonModal ref={modal} trigger="open-edit-note-modal" onWillDismiss={(ev) => onWillDismiss(ev, note)}>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
        </IonButtons>
        <IonTitle>Note</IonTitle>
        <IonButtons slot="end">
          <IonButton strong={true} onClick={() => confirm()}>
            Done
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <IonItem>
        <IonLabel position="stacked">Enter your name</IonLabel>
        <IonTextarea ref={input} onIonInput={(e) => {
          if (e.target.value) {
            setNote(e.target.value)
          }
        }} placeholder="Add Your Note (Markdown Format)"/>
      </IonItem>
    </IonContent>
  </IonModal>
}
export default EditTextModal
