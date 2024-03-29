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
  IonPage,
  IonRippleEffect,
  IonTitle,
  IonToolbar,
  isPlatform,
  useIonViewWillEnter,
} from '@ionic/react'
import React, { createRef, useEffect, useReducer, useState } from 'react'
import { addOutline, checkmarkCircleOutline, ellipsisHorizontal, ellipsisVertical, trashOutline, } from 'ionicons/icons'
import { Menu, MenuItem } from '@mui/material'
import { type RouteComponentProps } from 'react-router'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import './index.scss'
import DelayDisplay from '../../components/DelayDisplay'
import { type ListTheme, listThemes } from '../../theme/listThemes'
import useIsDark from '../../hooks/useIsDark'
import { darkenColor, lightenColor } from './utils'
import TaskItems from '../../components/TaskItems'
import { TodoTask } from '../../models/TodoTask'
import { setStatusbarColor } from '../../theme/utils'
import { taskReducer } from './reducer'
import { Accordion, AccordionDetails, AccordionSummary } from './Accordion'
import { useHistory } from 'react-router-dom'
import Sheet from 'react-modal-sheet'
import { useTodoTasks } from '../../query'

type TodoPageProps = RouteComponentProps<{
  id: string;
  theme: string;
}>;

const TodoList: React.FC<TodoPageProps> = ({ match }) => {
  const {
    id = 'tasks',
    theme = 'green'
  } = match.params
  const getTitleText = (id: string): string => {
    if (id === 'myday') {
      return 'My Day'
    } else {
      return id
    }
  }
  const history = useHistory()
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    setIsDesktop(mediaQuery.matches)
  }, [])
  const isIOS = isPlatform('ios')
  const isAndroid = isPlatform('android')
  const isPWA = isPlatform('pwa')
  const [isAddingTask, setIsAddingTask] = React.useState(false)
  const [currentText, setCurrentText] = React.useState('')
  // data and reducers
  const {
    data,
  } = useTodoTasks()
  const [{
    tasks,
    completedTasks
  }, dispatch] = useReducer(taskReducer, {
    tasks: data || [],
    completedTasks: [],
  })
  useEffect(() => {
    if (data) {
      dispatch({
        type: 'setTasks',
        tasks: data.filter(t => !t.completed) || []
      })
      dispatch({
        type: 'setCompletedTasks',
        tasks: data.filter(t => t.completed) || []
      })
    }
  }, [data])
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
    if (!isIOS) {
      setAnchorEl(event.currentTarget)
    } else {
      setIsSheetModalOpen(true)
    }
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const isDark = useIsDark()
  const listTheme: ListTheme = listThemes[theme]
  const themeUnit = isDark ? listTheme.dark : listTheme.light
  useIonViewWillEnter(() => {
    setStatusbarColor(themeUnit.background)
  })
  useEffect(() => {
    if (isAddingTask) {
      setStatusbarColor(darkenColor(themeUnit.background, 0.3))
    } else {
      setStatusbarColor(themeUnit.background)
    }
  }, [themeUnit.background, isAddingTask])
  const getFooterItemBackground = () => {
    if (isDark) {
      return '#212121'
    } else {
      return themeUnit.reversed
        ? lightenColor(themeUnit.background)
        : 'rgba(0, 0, 0, 0.1)'
    }
  }
  const getContentStyle = () => {
    const style = {
      '--background': themeUnit.background,
      '--padding-top': '0px',
    }
    if (isAddingTask && !isDesktop) {
      if (isIOS) {
        if (isPWA) {
          style['--padding-top'] = '330px'
        } else {
          // in browser
          style['--padding-top'] = '255px'
        }
      } else if (isAndroid) {
        if (isPWA) {
          style['--padding-top'] = '230px'
        } else {
          // in browser
          style['--padding-top'] = '230px'
        }
      }
    }
    return style
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
        marginBottom: isPWA && !isDesktop && !isAndroid ? 49 : 12,
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
      '--color': themeUnit.text,
    },
    contentHeader: {
      color: themeUnit.text,
      '--background': themeUnit.background,
      '--color': themeUnit.text,
      '--min-height': id === 'myday' ? '65px' : '40px',
    },
    toolbar: {
      '--background': themeUnit.background,
      '--color': themeUnit.text,
    },
    iconButton: { color: themeUnit.text },
    content: getContentStyle(),
    footer: {
      bottom: -1,
      background: isAddingTask ? 'transparent' : themeUnit.background,
    },
    footerItem: getFooterItemStyle(),
    newTaskIcon: {
      fontSize: 32,
      marginLeft: 9,
      marginRight: 11,
      height: 44,
    },
    newTaskInput: {
      '--placeholder-color': isAddingTask ? '#767678' : themeUnit.text,
      '--placeholder-opacity': 1,
      borderWidth: 0,
    },
    footerItem2: {
      '--min-height': '10px',
      display: isAddingTask ? 'block' : 'none',
    },
  }

  const getTitle = (id: string) => {
    if (id === 'myday') {
      return (
        <div style={styles.header}>
          <div className="today">My Day</div>
          <div className="today-date">{new Date().toLocaleDateString()}</div>
        </div>
      )
    }
    return <div>{id}</div>
  }
  const title = getTitle(id)
  const addTask = (task: TodoTask) => {
    // add task to tasks
    dispatch({
      type: 'add',
      task,
    })
  }
  // modal related
  const [IsSheetModalOpen, setIsSheetModalOpen] = useState(false)
  const contentRef = createRef<HTMLIonContentElement>()

  function scrollToTop () {
    // Passing a duration to the method makes it so the scroll slowly
    // goes to the top instead of instantly
    contentRef.current?.scrollToTop(500)
  }

  const onFinishTask = (task: TodoTask, completed: boolean) => {
    dispatch({
      type: 'complete',
      task,
      completed,
    })
  }
  const onEditTask = (task: TodoTask) => {
    history.push(`/task/${task.id}/${theme}/${getTitleText(id)}`)
  }
  const setTasks = (tasks: TodoTask[]) => {
    dispatch({
      type: 'setTasks',
      tasks,
    })
  }
  const setCompletedTasks = (tasks: TodoTask[]) => {
    dispatch({
      type: 'setCompletedTasks',
      tasks,
    })
  }
  const [completedExpanded, setCompletedExpanded] = React.useState<
    string | false
  >('panel_completed')
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setCompletedExpanded(newExpanded ? panel : false)
    }
  const [movingStatus, setMovingStatus] = React.useState<{
    index: number;
    isInCompleted: boolean;
  }>({
    index: -1,
    isInCompleted: false,
  })
  const onMoveTask = (index: number, isInCompleted: boolean) => {
    setMovingStatus({
      index,
      isInCompleted,
    })
  }
  let moveClassname = ''
  if (movingStatus.index !== -1) {
    moveClassname = ` move-${movingStatus.isInCompleted ? 'down' : 'up'}`
  }
  return (
    <IonPage key={'bottom'}>
      <IonHeader mode="ios" className="ion-no-border" style={styles.header}>
        <IonToolbar mode={isIOS ? 'ios' : 'md'} style={styles.toolbar}>
          <IonButtons slot="start">
            <IonBackButton
              style={styles.iconButton}
              defaultHref="/home"
              text={isIOS ? 'Lists' : ''}
            ></IonBackButton>
          </IonButtons>
          <IonTitle style={styles.header} className="page-header">
            <DelayDisplay>{title}</DelayDisplay>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton
              color={themeUnit.text}
              style={styles.iconButton}
              onClick={handleMenu}
            >
              <IonIcon
                slot="icon-only"
                ios={ellipsisHorizontal}
                md={ellipsisVertical}
              ></IonIcon>
            </IonButton>
          </IonButtons>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            className="todo-side-menu"
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <IonIcon icon={checkmarkCircleOutline}></IonIcon>
              </ListItemIcon>
              <ListItemText>
                <span>Show Completed Tasks</span>
              </ListItemText>
            </MenuItem>
            <MenuItem style={{ fontSize: 14 }} onClick={handleClose}>
              <ListItemIcon>
                <IonIcon icon={trashOutline}></IonIcon>
              </ListItemIcon>
              <ListItemText>
                <span>Delete List</span>
              </ListItemText>
            </MenuItem>
          </Menu>
        </IonToolbar>
      </IonHeader>
      <IonContent ref={contentRef} fullscreen style={styles.content}>
        <IonHeader
          style={styles.header}
          className="ion-no-border content-header"
          mode="ios"
          collapse="condense"
        >
          <IonToolbar mode="ios" style={styles.contentHeader}>
            <IonTitle size="large">{title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <>
          <TaskItems
            isInCompleted={false}
            tasks={tasks}
            theme={listTheme}
            setTasks={setTasks}
            movingStatus={movingStatus}
            onMoveTask={onMoveTask}
            onFinishTask={onFinishTask}
            onEditTask={onEditTask}
            taskLength={tasks.length}
          ></TaskItems>
          <Accordion
            expanded={completedExpanded === 'panel_completed'}
            onChange={handleChange('panel_completed')}
            style={{
              background: themeUnit.background,
              borderWidth: 0,
              display: completedTasks.length > 0 ? 'block' : 'none',
            }}
          >
            <AccordionSummary
              className={
                'ion-activatable ripple-parent rounded-rectangle' + moveClassname
              }
              style={{
                background: themeUnit.background,
                borderWidth: 0,
              }}
              iconColor={isDark ? themeUnit.text : 'white'}
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <IonRippleEffect></IonRippleEffect>
              <div
                style={{
                  color: themeUnit.text,
                  fontWeight: 500,
                }}
              >
                Completed {completedTasks.length}
              </div>
            </AccordionSummary>
            <AccordionDetails
              style={{
                background: themeUnit.background,
                borderWidth: 0,
                padding: 0,
              }}
            >
              <TaskItems
                isInCompleted={true}
                tasks={completedTasks}
                theme={listTheme}
                setTasks={setCompletedTasks}
                movingStatus={movingStatus}
                onMoveTask={onMoveTask}
                onFinishTask={onFinishTask}
                onEditTask={onEditTask}
                taskLength={tasks.length}
              ></TaskItems>
            </AccordionDetails>
          </Accordion>
        </>
        <Sheet
          snapPoints={[0.4, 0]}
          isOpen={IsSheetModalOpen}
          onClose={() => setIsSheetModalOpen(false)}
        >
          <Sheet.Container>
            <Sheet.Header/>
            <Sheet.Content>
              <IonToolbar style={{ marginTop: -10 }} color={'transparent'}>
                <IonTitle>List Options</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={() => setIsSheetModalOpen(false)}>
                    <span style={{ color: '#436af2' }}>Done</span>
                  </IonButton>
                </IonButtons>
              </IonToolbar>
              <IonList>
                <IonItem detail={false} lines={'none'} button>
                  <IonIcon
                    slot="start"
                    style={{ color: '#e42b2d' }}
                    icon={trashOutline}
                  ></IonIcon>
                  <IonLabel style={{ color: '#e42b2d' }}>Delete List</IonLabel>
                </IonItem>
              </IonList>
            </Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop onTap={() => setIsSheetModalOpen(false)}/>
        </Sheet>
        {isAddingTask && <div className="add-task-mask"></div>}
      </IonContent>
      <IonFooter mode="ios" className="ion-no-border" style={styles.footer}>
        <div style={styles.footerItem}>
          {!isAddingTask && (
            <IonIcon style={styles.newTaskIcon} icon={addOutline}></IonIcon>
          )}
          {isAddingTask && (
            <div
              style={{
                marginLeft: 18,
                marginRight: 18,
              }}
            >
              <IonCheckbox aria-label="add task checkbox" aria-readonly></IonCheckbox>
            </div>
          )}
          <IonInput
            aria-label="Add a task"
            type="text"
            value={currentText}
            onIonInput={(ev) => {
              setCurrentText(`${ev.target.value}`)
            }}
            onIonFocus={() => {
              setIsAddingTask(true)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addTask({
                  id: new Date().getTime().toString(),
                  title: currentText,
                  order: tasks.length,
                  completed: false,
                  note: '',
                })
                setCurrentText('')
                scrollToTop()
              }
            }}
            onIonBlur={() => {
              setIsAddingTask(false)
            }}
            style={styles.newTaskInput}
            placeholder="Add a Task"
          ></IonInput>
        </div>
      </IonFooter>
    </IonPage>
  )
}

export default TodoList
