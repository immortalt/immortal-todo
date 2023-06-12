import { useQuery, UseQueryResult } from 'react-query'
import { fetchTodoTasks } from './api'
import { TodoTask } from '../models/TodoTask'

export const useTodoTasks = (): UseQueryResult<TodoTask[]> => {
  return useQuery('todo_tasks', fetchTodoTasks)
}
