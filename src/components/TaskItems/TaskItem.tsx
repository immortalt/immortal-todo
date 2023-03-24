import { IonCheckbox, IonLabel, IonRippleEffect } from '@ionic/react'
import React, { useRef } from 'react'
import useIsDark from '../../hooks/useIsDark'
import { TodoTask } from '../../models/TodoTask'
import { DraggableProvided, DraggableStateSnapshot } from '../react-beautiful-dnd'
import './TaskItem.css'
import { Checkbox } from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'

type TaskItemProps = {
  snapshot: DraggableStateSnapshot,
  provided: DraggableProvided,
  task: TodoTask
  radioColor: string
  onFinishTask: (task: TodoTask, finished: boolean) => void
}
const TaskItem: React.FC<TaskItemProps> = (
  {
    snapshot,
    provided,
    task,
    radioColor,
    onFinishTask
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
    },
    subTitle: {
      color: isDark ? '#939393' : '#767678',
    },
    chechBoxDiv: {
      marginRight: 20,
      marginLeft: 17
    }
  }
  const getItemStyle = (isDragging: boolean, draggableStyle: any) => {
    return {
      background: isDark ? '#212121' : 'white',
      ...draggableStyle,
    }
  }
  const [checked, setChecked] = React.useState(task.completed)
  const [stared, setStared] = React.useState(false)
  const [showCheckboxAnimation, setShowCheckboxAnimation] = React.useState(!checked)
  const [enableRipple, setEnableRipple] = React.useState(false)
  const timerRef = useRef<any>()
  return <div className={'todotask-item ion-activatable ripple-parent'} ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              )}
              onTouchStart={() => {
                console.log('IonItem clicked')
                setEnableRipple(true)
              }}
  >
    {enableRipple && <IonRippleEffect style={{ borderRadius: 8 }}></IonRippleEffect>}
    <div className={showCheckboxAnimation ? 'finished my-checkbox' : 'finished'}
         onTouchStart={(e) => {
           setEnableRipple(false)
           e.stopPropagation()
         }}
         onMouseDown={(e) => {
           setEnableRipple(false)
           e.stopPropagation()
         }}
         onDoubleClick={(e) => {
           console.log('double click')
           e.stopPropagation()
           e.preventDefault()
         }
         }
         onClick={(e) => {
           e.stopPropagation()
           // prevent the quick click to stop the check process
           if (checked == task.completed) {
             setChecked(!task.completed)
             // play animation
             setShowCheckboxAnimation(true)
             if (timerRef.current) {
               clearTimeout(timerRef.current)
               timerRef.current = null
             }
             // after 400ms, finish the task
             timerRef.current = setTimeout(() => {
               onFinishTask(task, !task.completed)
               setShowCheckboxAnimation(false)
               timerRef.current = null
             }, 400)
           } else {
             // alert("Open the task to edit it")
           }
         }}
    >
      <div className={`circle circle-1 ${checked ? 'checked' : ''}`
      }></div>
      <div className={`circle circle-2 ${checked ? 'checked' : ''}`}></div>
      <div className={`circle circle-3 ${checked ? 'checked' : ''}`}></div>
      <div className={`circle circle-4 ${checked ? 'checked' : ''}`}></div>
      <div className={`circle circle-5 ${checked ? 'checked' : ''}`}></div>
      <div className={`circle circle-6 ${checked ? 'checked' : ''}`}></div>
      <IonCheckbox
        mode="ios" checked={checked}
        style={styles.radio}
      />
    </div>
    <IonLabel className="titles">
      <div>
        <div className="task-item-title" style={styles.title}>
          {task.title}
        </div>
        <div className="task-item-subtitle" style={styles.subTitle}>
          {'Tasks'}
        </div>
      </div>
    </IonLabel>
    <IonLabel className="favorite">
      <Checkbox checked={stared}
                inputProps={{ 'aria-label': 'controlled' }}
                icon={<StarBorderIcon/>} checkedIcon={<StarIcon/>}
                onTouchStart={(e) => {
                  setEnableRipple(false)
                  e.stopPropagation()
                }}
                onMouseDown={(e) => {
                  setEnableRipple(false)
                  e.stopPropagation()
                }}
                onChange={(e) => {
                  setStared(e.target.checked)
                }}
      />
    </IonLabel>
  </div>
}
export default TaskItem
