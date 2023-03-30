import { IonCheckbox, IonLabel, IonRippleEffect } from '@ionic/react'
import React, { useRef } from 'react'
import useIsDark from '../../hooks/useIsDark'
import { TodoTask } from '../../models/TodoTask'
import { DraggableProvided, DraggableStateSnapshot } from '../react-beautiful-dnd'
import './TaskItem.scss'
import { Checkbox } from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'

type TaskItemProps = {
  snapshot: DraggableStateSnapshot,
  provided: DraggableProvided,
  task: TodoTask
  radioColor: string
  onMoveTask: (index: number, isInCompleted: boolean) => void
  onFinishTask: (task: TodoTask, finished: boolean) => void
  onEditTask: (task: TodoTask) => void
  index: number
  taskLength: number
  isInCompleted: boolean
  className?: string
}
const TaskItem: React.FC<TaskItemProps> = (
  {
    snapshot,
    provided,
    task,
    radioColor,
    onMoveTask,
    onFinishTask,
    onEditTask,
    className,
    isInCompleted,
    index,
    taskLength,
  }) => {
  const [checked, setChecked] = React.useState(task.completed)
  const isDark = useIsDark()
  const getTitleColor = () => {
    if (task.completed) {
      return isDark ? '#939393' : '#767678'
    } else {
      return isDark ? '#e1e1e1' : '#34373d'
    }
  }
  const getSubtitleColor = () => {
    if (task.completed) {
      return isDark ? '#888888' : '#838385'
    } else {
      return isDark ? '#939393' : '#767678'
    }
  }
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
      color: getTitleColor(),
      textDecoration: task.completed ? 'line-through' : 'none'
    },
    subTitle: {
      color: getSubtitleColor(),
    },
    chechBoxDiv: {
      marginRight: 20,
      marginLeft: 17
    }
  }
  const getItemStyle = (isDragging: boolean, draggableStyle: any) => {
    let targetY = 0
    if (!isInCompleted) {
      targetY += (66 * (taskLength - (index + 1))) + 48
    } else {
      targetY -= (66 * index) + 48
    }
    return {
      background: isDark ? '#212121' : 'white',
      ...draggableStyle,
      '--move-to-y': `translateY(${targetY}px)`,
    }
  }
  const [stared, setStared] = React.useState(false)
  const [showCheckboxAnimation, setShowCheckboxAnimation] = React.useState(!checked)
  const [showMoveAnimation, setShowMoveAnimation] = React.useState<string>()
  const [enableRipple, setEnableRipple] = React.useState(false)
  const animationTimerRef = useRef<any>()
  const finishTimerRef = useRef<any>()
  const navTimerrRef = useRef<any>()
  return <div
    className={'todotask-item ion-activatable ripple-parent' + (showMoveAnimation ? ` ${showMoveAnimation}` : '') + (className ? ' ' + className : '')}
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    style={getItemStyle(
      snapshot.isDragging,
      provided.draggableProps.style
    )}
    onTouchStart={() => {
      setEnableRipple(true)
    }}
    onClick={() => {
      if (navTimerrRef.current) {
        clearTimeout(navTimerrRef.current)
        navTimerrRef.current = null
      }
      navTimerrRef.current = setTimeout(() => {
        onEditTask(task)
        navTimerrRef.current = null
      }, 200)
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
           e.stopPropagation()
           e.preventDefault()
         }
         }
         onClick={(e) => {
           e.stopPropagation()
           // prevent the quick click to stop the check process
           if (checked == task.completed) {
             setChecked(!task.completed)
             // play checkbox animation
             setShowCheckboxAnimation(true)
             if (animationTimerRef.current) {
               clearTimeout(animationTimerRef.current)
               animationTimerRef.current = null
             }
             // after 200ms, move the task
             animationTimerRef.current = setTimeout(() => {
               // show the item move animation
               setShowMoveAnimation('move-item')
               onMoveTask(index, isInCompleted)
               if (finishTimerRef.current) {
                 clearTimeout(finishTimerRef.current)
                 finishTimerRef.current = null
               }
               // after 200ms, finish the task
               finishTimerRef.current = setTimeout(() => {
                 onMoveTask(-1, false)
                 onFinishTask(task, !task.completed)
                 finishTimerRef.current = null
               }, 200)
               setShowCheckboxAnimation(false)
               animationTimerRef.current = null
             }, 200)
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
