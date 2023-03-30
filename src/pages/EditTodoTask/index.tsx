import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonToolbar,
  isPlatform
} from '@ionic/react'
import React, { useEffect } from 'react'
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
  const onTaskChange = (t: TodoTask) => {
    setTask(t)
  }
  const [task, setTask] = React.useState({
    id: '1',
    title: 'task1',
    completed: false,
    order: 1
  })
  return (
    <IonPage>
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
          paddingRight: 4
        }}>
          <EditableTaskItem task={task} radioColor={themeUnit.icon} onChange={onTaskChange}></EditableTaskItem>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem button detail={false}>
            <IonLabel style={{
              height: 100,
            }}>Add Note</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter mode="ios" className="ion-no-border">
        footer
      </IonFooter>
    </IonPage>
  )
}

export default EditTodoTask
