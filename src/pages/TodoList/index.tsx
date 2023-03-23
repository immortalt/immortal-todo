import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
  isPlatform
} from '@ionic/react'
import React, { useEffect, useRef, useState } from 'react'
import { addOutline, checkmarkCircleOutline, ellipsisHorizontal, ellipsisVertical, trashOutline } from 'ionicons/icons'
import { Menu, MenuItem } from '@mui/material'
import { type RouteComponentProps } from 'react-router'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import './index.css'
import DelayDisplay from '../../components/DelayDisplay'
import { type ListTheme, listThemes } from '../../theme/listThemes'
import { setStatusbarColor } from '../../theme/utils'
import useIsDark from '../../hooks/useIsDark'
import { darkenColor, lightenColor } from './utils'
import TaskItems from '../../components/TaskItems'
import { TodoTask } from '../../models/TodoTask'

const getItems = (count: number): TodoTask[] =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `list-${k}`,
    title: `List ${k}`,
    count: k,
    order: k,
    finished: false
  }))

type TodoPageProps = RouteComponentProps<{
  id: string
  theme: string
}>

const TodoList: React.FC<TodoPageProps> = ({ match }) => {
  const {
    id = 'tasks',
    theme = 'green'
  } = match.params
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    setIsDesktop(mediaQuery.matches)
  }, [])
  const isIOS = isPlatform('ios')
  const isPWA = isPlatform('pwa')
  const [isAddingTask, setIsAddingTask] = React.useState(false)
  const [currentText, setCurrentText] = React.useState('')
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
    if (!isIOS) {
      setAnchorEl(event.currentTarget)
    }
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const isDark = useIsDark()
  const listTheme: ListTheme = listThemes[theme]
  const themeUnit = isDark ? listTheme.dark : listTheme.light
  useEffect(() => {
    setStatusbarColor(themeUnit.background)
  }, [themeUnit.background])
  const getFooterItemBackground = () => {
    if (isDark) {
      return '#212121'
    } else {
      return themeUnit.reversed ? lightenColor(themeUnit.background) : darkenColor(themeUnit.background)
    }
  }
  const getFooterItemStyle = () => {
    if (!isAddingTask) {
      return {
        display: 'flex',
        alignItems: 'center',
        background: getFooterItemBackground(),
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 8,
        height: '54px',
        color: themeUnit.text,
        marginTop: 10,
        marginBottom: (isPWA && !isDesktop) ? 49 : 12,
      }
    }
    // isAddingTask
    return {
      display: 'flex',
      alignItems: 'center',
      background: isDark ? '#212121' : 'white',
      marginLeft: 0,
      marginRight: 0,
      height: !isDesktop ? 54 : 70,
      color: isDark ? 'white' : '#767678',
      boxShadow: '0px 8px 12px rgba(0, 0, 0, 1)',
      marginTop: 1,
      marginBottom: -1,
      borderRadius: '8px 8px 0 0',
    }
  }
  const styles = {
    header: {
      color: themeUnit.text,
      '--background': themeUnit.background,
      '--color': themeUnit.text
    },
    contentHeader: {
      color: themeUnit.text,
      '--background': themeUnit.background,
      '--color': themeUnit.text,
      '--min-height': id === 'myday' ? '65px' : '40px'
    },
    toolbar: {
      '--background': themeUnit.background,
      '--color': themeUnit.text
    },
    iconButton: { color: themeUnit.text },
    content: {
      '--background': themeUnit.background,
    },
    footer: {
      bottom: -1,
      background: isAddingTask ? 'transparent' : themeUnit.background,
    },
    footerItem: getFooterItemStyle(),
    newTaskIcon: {
      fontSize: 32,
      marginLeft: 9,
      marginRight: 11,
    },
    newTaskInput: {
      '--placeholder-color': isAddingTask ? '#767678' : themeUnit.text,
      '--placeholder-opacity': 1,
      borderWidth: 0
    },
    footerItem2: {
      '--min-height': '10px',
      display: isAddingTask ? 'block' : 'none',
    },
  }
  const getTitle = (id: string) => {
    if (id === 'myday') {
      return <div style={styles.header}>
        <div className="today">My Day</div>
        <div className="today-date">{new Date().toLocaleDateString()}</div>
      </div>
    }
    return <div>{id}</div>
  }
  const title = getTitle(id)
  // modal related
  const modal = useRef<HTMLIonModalElement>(null)
  const sheetModel = <IonModal ref={modal} trigger="open-modal" initialBreakpoint={0.5} breakpoints={[0, 0.5]}>
    <IonToolbar style={{ marginTop: 20 }} color={'transparent'}>
      <IonTitle>
        List Options
      </IonTitle>
      <IonButtons slot="end">
        <IonButton onClick={async () => await modal.current?.dismiss()}>
          <span style={{ color: '#436af2' }}>Done</span>
        </IonButton>
      </IonButtons>
    </IonToolbar>
    <IonContent>
      <IonList>
        <IonItem detail={false} lines={'none'} button>
          <IonIcon slot="start" style={{ color: '#e42b2d' }} icon={trashOutline}></IonIcon>
          <IonLabel style={{ color: '#e42b2d' }}>
            Delete List
          </IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  </IonModal>
  return (
    <IonPage>
      <IonHeader mode="ios" className="ion-no-border" style={styles.header}>
        <IonToolbar mode={isIOS ? 'ios' : 'md'} style={styles.toolbar}>
          <IonButtons slot="start">
            <IonBackButton style={styles.iconButton} defaultHref="/home"
                           text={isIOS ? 'Lists' : ''}></IonBackButton>
          </IonButtons>
          <IonTitle style={styles.header}
                    className="page-header">
            <DelayDisplay>{title}</DelayDisplay>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton
              color={themeUnit.text}
              style={styles.iconButton}
              id={isIOS ? 'open-modal' : ''}
              onClick={handleMenu}
            >
              <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical}></IonIcon>
            </IonButton>
          </IonButtons>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            className="todo-side-menu"
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <IonIcon icon={checkmarkCircleOutline}></IonIcon>
              </ListItemIcon>
              <ListItemText><span>Show Completed Tasks</span></ListItemText>
            </MenuItem>
            <MenuItem style={{ fontSize: 14 }} onClick={handleClose}> <ListItemIcon>
              <IonIcon icon={trashOutline}></IonIcon>
            </ListItemIcon>
              <ListItemText><span>Delete List</span></ListItemText>
            </MenuItem>
          </Menu>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen style={styles.content}>
        <IonHeader style={styles.header} className="ion-no-border content-header" mode="ios"
                   collapse="condense">
          <IonToolbar mode="ios" style={styles.contentHeader}>
            <IonTitle size="large">{title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <TaskItems items={getItems(20)} theme={listTheme}></TaskItems>
        {isAddingTask && <div className="add-task-mask"></div>}
        {isIOS && sheetModel}
      </IonContent>
      <IonFooter mode="ios" className="ion-no-border" style={styles.footer}>
        <div style={styles.footerItem}>
          {!isAddingTask && <IonIcon style={styles.newTaskIcon} icon={addOutline}></IonIcon>}
          {isAddingTask && <IonCheckbox style={{
            marginLeft: 21,
            marginRight: 15
          }} aria-readonly></IonCheckbox>}
          <IonInput
            value={currentText}
            onIonChange={(e) => {
              setCurrentText(e.detail.value!)
            }}
            onClick={() => {
              setIsAddingTask(true)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setIsAddingTask(false)
              }
            }}
            onIonBlur={() => {
              setIsAddingTask(false)
              setCurrentText('')
            }} style={styles.newTaskInput} placeholder="Add a Task"></IonInput>
        </div>
      </IonFooter>
    </IonPage>
  )
}

export default TodoList
