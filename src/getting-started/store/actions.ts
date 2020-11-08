export const ADD_TODO = "ADD_TODO"
export const TOGGLE_TODO = "TOGGLE_TODO"
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER"

export interface AddTodoAction {
  type: typeof ADD_TODO
  id: number
  text: string
}

export interface ToggleTodoAction {
  type: typeof TOGGLE_TODO
  id: number
}

export type TodoAction = AddTodoAction | ToggleTodoAction

export interface VisibilityFilterAction {
  type: typeof SET_VISIBILITY_FILTER
  filter: string
}

export type TodoAppAction = TodoAction | VisibilityFilterAction
