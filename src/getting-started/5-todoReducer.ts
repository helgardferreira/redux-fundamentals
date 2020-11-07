import { Reducer } from "redux"
import { Todo } from "./4-avoidingObjectMutations"

export const ADD_TODO = "ADD_TODO"
export const TOGGLE_TODO = "TOGGLE_TODO"

export interface AddTodoAction {
  type: typeof ADD_TODO
  id: number
  text: string
}

export interface ToggleTodoAction {
  type: typeof TOGGLE_TODO
  id: number
}

type TodoAction = AddTodoAction | ToggleTodoAction

export const todoReducer: Reducer<Todo, TodoAction> = (
  state = {
    id: 0,
    text: "",
    completed: false,
  },
  action
) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        id: action.id,
        text: action.text,
        completed: false,
      }
    case TOGGLE_TODO: {
      return state.id === action.id
        ? {
            ...state,
            completed: !state.completed,
          }
        : state
    }
    default:
      return state
  }
}

export const todosReducer: Reducer<Todo[], TodoAction> = (
  state = [],
  action
) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, todoReducer(undefined, action)]
    case TOGGLE_TODO: {
      return state.map(todo => todoReducer(todo, action))
    }
    default:
      return state
  }
}
