import { IonCheckbox } from '@ionic/react'
import React, { useRef } from 'react'
import useIsDark from '../../hooks/useIsDark'

type TaskItemProps = {
  color: string
  checked: boolean
  onChange: (checked: boolean) => void
  style?: React.CSSProperties
}
const TaskItem: React.FC<TaskItemProps> = (
  {
    color,
    checked,
    onChange,
    style,
  }) => {
  const isDark = useIsDark()
  const styles = {
    radio: {
      width: '24px',
      height: '24px',
      '--border-width': '2px',
      '--checkmark-width': '2px',
      '--checkmark-color': isDark ? '#212121' : '#FFFFFF',
      '--transition': 'transform 2s cubic-bezier(0.4, 0, 0.2, 1)',
      // Unchecked
      '--border-color': isDark ? '#939393' : '#767678',
      '--checkbox-background': isDark ? '#212121' : '#FFFFFF',
      // Checked
      '--color-checked': isDark ? color : 'black',
      '--checkbox-background-checked': color,
      '--border-color-checked': color,
    },
    chechBoxDiv: {
      marginRight: -6,
      marginLeft: 0
    }
  }
  const [showCheckboxAnimation, setShowCheckboxAnimation] = React.useState(!checked)
  const animationTimerRef = useRef<any>()
  return <div style={styles.chechBoxDiv} className={showCheckboxAnimation ? 'finished my-checkbox' : 'finished'}
              onTouchStart={(e) => {
                e.stopPropagation()
              }}
              onMouseDown={(e) => {
                e.stopPropagation()
              }}
              onDoubleClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
              onClick={(e) => {
                e.stopPropagation()
                // prevent the quick click to stop the check process
                onChange(!checked)
                // play checkbox animation
                setShowCheckboxAnimation(true)
                if (animationTimerRef.current) {
                  clearTimeout(animationTimerRef.current)
                  animationTimerRef.current = null
                }
                animationTimerRef.current = setTimeout(() => {
                  setShowCheckboxAnimation(false)
                  animationTimerRef.current = null
                }, 200)
              }}
  >
    <div className={`circle circle-1 ${checked ? 'checked' : ''}`
    }></div>
    <div className={`circle circle-2 ${checked ? 'checked' : ''}`}></div>
    <div className={`circle circle-3 ${checked ? 'checked' : ''}`}></div>
    <div className={`circle circle-4 ${checked ? 'checked' : ''}`}></div>
    <div className={`circle circle-5 ${checked ? 'checked' : ''}`}></div>
    <div className={`circle circle-6 ${checked ? 'checked' : ''}`}></div>
    <IonCheckbox aria-label="completed"
                 mode="ios" checked={checked}
                 onIonChange={e => onChange(e.detail.checked)}
                 style={{ ...styles.radio, ...style }}
    />
  </div>
}
export default TaskItem
