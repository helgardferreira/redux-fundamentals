import { Reducer } from "redux"
import { TodoType } from "../../types/TodoType"
import { TodoAction, ADD_TODO, TOGGLE_TODO } from "../actions"

export const todoReducer: Reducer<TodoType, TodoAction> = (
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
