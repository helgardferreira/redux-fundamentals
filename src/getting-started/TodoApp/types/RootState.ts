import { TodoType } from "./TodoType"

export default interface RootState {
  todos: TodoType[]
  visibilityFilter: string
}
