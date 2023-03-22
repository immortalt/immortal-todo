import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
  isPlatform
} from '@ionic/react'
import React, { useEffect, useRef } from 'react'
import { checkmarkCircleOutline, ellipsisHorizontal, ellipsisVertical, trashOutline } from 'ionicons/icons'
import { Menu, MenuItem } from '@mui/material'
import { type RouteComponentProps } from 'react-router'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import './index.css'
import DelayDisplay from '../../components/DelayDisplay'
import { type ListTheme, listThemes } from '../../theme/listThemes'
import TaskItems from '../../components/TaskItems'
import { setStatusbarColor } from '../../theme/utils'
import useIsDark from '../../hooks/useIsDark'

type TodoPageProps = RouteComponentProps<{
  id: string
  theme: string
}>

const TodoList: React.FC<TodoPageProps> = ({ match }) => {
  const {
    id = 'tasks',
    theme = 'green'
  } = match.params
  const isIOS = isPlatform('ios')
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
    content: { '--background': themeUnit.background }
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
        <TaskItems theme={listTheme}></TaskItems>
        <IonModal ref={modal} trigger="open-modal" initialBreakpoint={0.5} breakpoints={[0, 0.5]}>
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
      </IonContent>
    </IonPage>
  )
}

export default TodoList
