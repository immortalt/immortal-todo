import { IonLabel, } from '@ionic/react'
import React from 'react'
import useIsDark from '../../hooks/useIsDark'
import { TodoTask } from '../../models/TodoTask'
import './index.scss'
import { Checkbox } from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'
import AnimatedCheckbox from '../AnimatedCheckbox'

type TaskItemProps = {
  task: TodoTask
  radioColor: string
  onChange: (task: TodoTask) => void
  className?: string
  style?: React.CSSProperties
}
const EditableTaskItem: React.FC<TaskItemProps> = (
  {
    task,
    radioColor,
    className,
    onChange,
    style
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
  const styles = {
    star: {
      fontSize: 20,
      color: 'var(--ion-color-medium)'
    },
    title: {
      color: getTitleColor(),
      fontSize: 20,
      fontWeight: 500,
      textDecoration: task.completed ? 'line-through' : 'none'
    },
  }

  const [stared, setStared] = React.useState(false)
  return <div
    className={'editable-todotask-item ion-activatable' + (className ? ' ' + className : '')}
    style={{
      background: 'transparent',
      height: 55,
      zIndex: 100,
      ...style
    }}
  >
    <AnimatedCheckbox color={radioColor} checked={checked} onChange={(val) => setChecked(val)}/>
    <IonLabel className="titles">
      <div>
        <div className="task-item-title" style={styles.title}>
          <input type="text" value={task.title} onChange={(e) => {
            onChange({
              ...task,
              title: e.target.value
            })
          }}/>
        </div>
      </div>
    </IonLabel>
    <IonLabel className="favorite">
      <Checkbox checked={stared}
                inputProps={{ 'aria-label': 'controlled' }}
                icon={<StarBorderIcon/>} checkedIcon={<StarIcon/>}
                onTouchStart={(e) => {
                  e.stopPropagation()
                }}
                onMouseDown={(e) => {
                  e.stopPropagation()
                }}
                onChange={(e) => {
                  setStared(e.target.checked)
                }}
      />
    </IonLabel>
  </div>
}
export default EditableTaskItem
