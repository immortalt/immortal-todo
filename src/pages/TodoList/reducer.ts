import { TodoTask } from '../../models/TodoTask'

export type TaskState = {
  tasks: TodoTask[]
  completedTasks: TodoTask[]
}
export type TaskAction =
  | { type: 'complete', task: TodoTask, completed: boolean }
  | { type: 'add', task: TodoTask }
  | { type: 'setTasks', tasks: TodoTask[] }
  | { type: 'setCompletedTasks', tasks: TodoTask[] }

export function taskReducer (state: TaskState, action: TaskAction): TaskState {
  if (action.type === 'complete') {
    action.task.completed = action.completed
    if (action.completed) {
      const index = state.tasks.findIndex(t => t.id === action.task.id)
      const newTasks = [...state.tasks]
      newTasks.splice(index, 1)
      return {
        tasks: newTasks,
        completedTasks: [action.task, ...state.completedTasks,],
      }
    } else {
      const index = state.completedTasks.findIndex(t => t.id === action.task.id)
      const newTasks = [...state.completedTasks]
      newTasks.splice(index, 1)
      return {
        tasks: [action.task, ...state.tasks,],
        completedTasks: newTasks,
      }
    }

  } else if (action.type === 'add') {
    return {
      tasks: [action.task, ...state.tasks,],
      completedTasks: state.completedTasks,
    }
  } else if (action.type === 'setTasks') {
    return {
      tasks: action.tasks,
      completedTasks: state.completedTasks,
    }
  } else if (action.type === 'setCompletedTasks') {
    return {
      tasks: state.tasks,
      completedTasks: action.tasks,
    }
  }
  throw Error('Unknown action.')
}
