import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  isPlatform,
  useIonViewWillEnter
} from '@ionic/react'
import React, { useEffect, useRef, useState } from 'react'
import { type RouteComponentProps } from 'react-router'
import './index.scss'
import useIsDark from '../../hooks/useIsDark'
import { ListTheme, listThemes } from '../../theme/listThemes'
import { setStatusbarColor } from '../../theme/utils'
import EditableTaskItem from '../../components/EditableTaskItem'
import { TodoTask } from '../../models/TodoTask'

type TodoPageProps = RouteComponentProps<{
  id: string
  theme: string
  from: string
}>

const EditTodoTask: React.FC<TodoPageProps> = ({ match }) => {
  const {
    id = '',
    theme = 'green',
    from = 'Home'
  } = match.params
  const isIOS = isPlatform('ios')
  const isDark = useIsDark()
  const listTheme: ListTheme = listThemes[theme]
  const themeUnit = isDark ? listTheme.dark : listTheme.light
  useEffect(() => {
    setStatusbarColor(isDark ? '#090909' : '#ffffff')
  }, [themeUnit.background])
  const [task, setTask] = React.useState<TodoTask>({
    id: '1',
    title: 'task1',
    completed: false,
    order: 1,
    note: 'note xxxx yyyy',
  })
  const onTaskChange = (task: TodoTask) => {
    setTask(task)
  }
  const editTextModal = useRef<HTMLIonModalElement>(null)
  const [presentingElement, setPresentingElement] = useState<HTMLElement | undefined>(undefined)
  const noteTextArea = useRef<HTMLIonTextareaElement>(null)
  useEffect(() => {
    setPresentingElement(page.current)
  }, [])
  const page = useRef(undefined)
  const [isEditNoteModalOpen, setIsEditNoteModalOpen] = useState(false)
  const [isPreviewNote, setIsPreviewNote] = useState(false)
  const [note, setNote] = useState(task.note || '')
  const onEditNoteDone = () => {
    console.log(noteTextArea.current?.value)
    setTask({
      ...task,
      note: note,
    })
  }
  useIonViewWillEnter(() => {
    setStatusbarColor(isDark ? '#090909' : '#ffffff')
  })
  useEffect(() => {
    if (isEditNoteModalOpen && isIOS) {
      setStatusbarColor('black')
    }
  }, [isEditNoteModalOpen])
  return (
    <IonPage ref={page}>
      <IonHeader style={{ background: isDark ? '#090909' : 'white' }} className="ion-no-border header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text={isIOS ? from : ''} style={{
              color: '#436af2',
            }} defaultHref="/home"
            ></IonBackButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar style={{
          paddingLeft: 4,
        }}>
          <EditableTaskItem task={task} radioColor={themeUnit.icon} onChange={onTaskChange}></EditableTaskItem>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem onClick={() => {
            setIsEditNoteModalOpen(true)
          }} button detail={false}>
            <IonLabel style={{
              height: 100,
            }}>{task.note ? <pre> {task.note}</pre> : 'Add Note'}</IonLabel>
          </IonItem>
        </IonList>

        <IonModal ref={editTextModal} isOpen={isEditNoteModalOpen}
                  presentingElement={presentingElement}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton
                  onClick={() => setIsPreviewNote(!isPreviewNote)}>{isPreviewNote ? 'Edit' : 'Preview'}</IonButton>
              </IonButtons>
              <IonTitle>Note</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true}
                           onClick={() => {
                             setIsEditNoteModalOpen(false)
                             onEditNoteDone()
                           }}>
                  Done
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonTextarea aria-label="Edit Note Textarea" autofocus style={{ '--border-width': 0 }} rows={20} autoGrow
                           value={note}
                           onIonInput={(e) => {
                             setNote(e.target.value || '')
                           }}
                           placeholder="Add Your Note (Markdown Format)"/>
            </IonItem>
          </IonContent>
        </IonModal>
      </IonContent>
      <IonFooter mode="ios" className="ion-no-border">
        footer
      </IonFooter>
    </IonPage>
  )
}

export default EditTodoTask
