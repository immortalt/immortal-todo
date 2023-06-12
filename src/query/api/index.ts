import { TodoTask } from '../../models/TodoTask'

const getItems = (count: number): TodoTask[] =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `list-${k}`,
    title: `List ${k}`,
    order: count - k,
    completed: false,
    note: `note ${k}`,
  }))

export function fetchTodoTasks () {
  return new Promise<TodoTask[]>((resolve) => {
    setTimeout(() => {
      resolve(getItems(5))
    }, 1000)
  })
}
