import React from 'react'
import { DragDropContext, Draggable } from '../react-beautiful-dnd'
import { StrictModeDroppable } from '../StrictModeDroppable'
import { ListTheme } from '../../theme/listThemes'
import useIsDark from '../../hooks/useIsDark'
import TaskItem from './TaskItem'
import { TodoTask } from '../../models/TodoTask'
import './index.scss'

// switch the order of the items in the array and return the new array
const reorder = (list: TodoTask[], source: number, destination: number): TodoTask[] => {
  const result = Array.from(list)
  const [removed] = result.splice(source, 1)
  result.splice(destination, 0, removed)
  // switch the order of the items
  const temp = result[source].order
  result[source].order = result[destination].order
  result[destination].order = temp
  // TODO: send a request to update the order of the items in the database
  return result
}

const getListStyle = () => ({
  width: '100%',
  cursor: 'default',
  paddingLeft: 8,
  paddingRight: 8,
})

type TaskItemsProps = {
  theme: ListTheme
  tasks: TodoTask[]
  setTasks: (items: TodoTask[]) => void
  movingStatus: { index: number, isInCompleted: boolean }
  onMoveTask: (index: number, isInCompleted: boolean) => void
  onFinishTask: (task: TodoTask, completed: boolean) => void
  isInCompleted: boolean,
  taskLength: number,
}
const TaskItems: React.FC<TaskItemsProps> = ({
  theme,
  tasks,
  setTasks,
  movingStatus,
  onMoveTask: onMoveTaskRoot,
  onFinishTask,
  isInCompleted,
  taskLength,
}) => {
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }
    const reorderedItems = reorder(
      tasks,
      result.source.index,
      result.destination.index
    )
    setTasks(reorderedItems)
  }
  const isDark = useIsDark()
  const themeUnit = isDark ? theme.dark : theme.light
  let radioColor: string
  if (themeUnit.reversed) {
    radioColor = themeUnit.text
  } else {
    radioColor = isDark ? themeUnit.text : themeUnit.background
  }
  const onMoveTask = (index: number, isInCompleted: boolean) => {
    onMoveTaskRoot(index, isInCompleted)
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable droppableId="droppable">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle()}
          >
            {tasks.map((item: TodoTask, index: number) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => {
                  // handle the move animation
                  let moveClassname = ''
                  // what will items in completed behave like
                  if (isInCompleted) {
                    // moving from completed to tasks
                    if (movingStatus.isInCompleted) {
                      if (movingStatus.index > 0) {
                        if (movingStatus.index !== -1 && movingStatus.index !== index && index < movingStatus.index) {
                          moveClassname = ` move-down`
                        }
                      }
                    }
                    // moving from tasks to completed
                    else {
                      // do nothing
                    }
                  }
                  // what will items in tasks behave like
                  else {
                    // moving from completed to tasks
                    if (movingStatus.isInCompleted) {
                      // do nothing
                    }
                    // moving from tasks to completed
                    else {
                      if (movingStatus.index !== -1 && movingStatus.index !== index && index > movingStatus.index) {
                        moveClassname = ` move-up`
                      }
                    }
                  }
                  return <TaskItem onMoveTask={onMoveTask}
                                   className={isInCompleted ? 'completed-task-item' + moveClassname : 'task-item' + moveClassname}
                                   task={item}
                                   radioColor={radioColor} snapshot={snapshot}
                                   provided={provided} onFinishTask={onFinishTask}
                                   key={item.id} isInCompleted={isInCompleted} index={index} taskLength={taskLength}
                  />
                }}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  )
}

export default TaskItems
