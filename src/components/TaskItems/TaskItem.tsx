import { IonCheckbox, IonIcon, IonItem, IonLabel, isPlatform } from '@ionic/react'
import { starOutline } from 'ionicons/icons'
import React, { useEffect } from 'react'
import useIsDark from '../../hooks/useIsDark'
import { TodoTask } from '../../models/TodoTask'
import { DraggableProvided, DraggableStateSnapshot } from '../react-beautiful-dnd'
import './TaskItem.css'

type TaskItemProps = {
  snapshot: DraggableStateSnapshot,
  provided: DraggableProvided,
  item: TodoTask
  radioColor: string
}
const TaskItem: React.FC<TaskItemProps> = (
  {
    snapshot,
    provided,
    item,
    radioColor
  }) => {
  const isDark = useIsDark()
  const styles = {
    star: {
      fontSize: 20,
      color: 'var(--ion-color-medium)'
    },
    radio: {
      width: '24px',
      height: '24px',
      '--border-width': '2px',
      '--checkmark-width': '2px',
      '--checkmark-color': isDark ? '#212121' : '#FFFFFF',
      '--transition': 'transform 2s cubic-bezier(0.4, 0, 0.2, 1)',
      // Unchecked
      '--border-color': isDark ? '#939393' : '#767678',
      '--background': isDark ? '#212121' : '#FFFFFF',
      // Checked
      '--color-checked': isDark ? radioColor : 'black',
      '--background-checked': radioColor,
      '--border-color-checked': radioColor,
    },
    title: {
      color: isDark ? '#e1e1e1' : '#34373d',
      marginBottom: 2
    },
    subTitle: {
      color: isDark ? '#939393' : '#767678',
      fontSize: 14
    },
    chechBoxDiv: isPlatform('ios') ? {
      marginRight: 7,
      marginLeft: -4
    } : { marginRight: 5 }
  }
  const getItemStyle = (isDragging: boolean, draggableStyle: any) => {
    return {
      userSelect: 'none',
      cursor: 'default',
      '--background': isDark ? '#212121' : 'white',
      '--min-height': '64px',
      '--border-radius': '8px',
      marginBottom: 1.5,
      ...draggableStyle,
    }
  }
  const [checked, setChecked] = React.useState(false)
  const [justDragged, setJustDragged] = React.useState(false)
  useEffect(() => {
    setJustDragged(false)
  }, [checked])
  return <IonItem button detail={false} ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}
                  lines="none"
                  onTouchEnd={() => {
                    if (snapshot.isDragging) {
                      setJustDragged(true)
                    }
                  }}
                  color={snapshot.isDragging ? 'light' : ''}
  >
    <div slot="start" style={styles.chechBoxDiv} className={!justDragged ? 'my-checkbox' : ''}>
      <div className={`circle circle-1 ${checked ? 'checked' : ''}`}></div>
      <div className={`circle circle-2 ${checked ? 'checked' : ''}`}></div>
      <div className={`circle circle-3 ${checked ? 'checked' : ''}`}></div>
      <div className={`circle circle-4 ${checked ? 'checked' : ''}`}></div>
      <div className={`circle circle-5 ${checked ? 'checked' : ''}`}></div>
      <div className={`circle circle-6 ${checked ? 'checked' : ''}`}></div>
      <IonCheckbox mode="ios" value={checked} onIonChange={e => {
        setChecked(e.detail.checked)
      }}
                   style={styles.radio}
      />
    </div>
    <IonLabel>
      <div>
        <div style={styles.title}>
          {item.title}
        </div>
        <div style={styles.subTitle}>
          {'Tasks'}
        </div>
      </div>
    </IonLabel>
    <IonLabel slot="end">
      <IonIcon style={styles.star} icon={starOutline}></IonIcon>
    </IonLabel>
  </IonItem>
}
export default TaskItem
