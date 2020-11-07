import { Reducer } from "redux"
import { Todo } from "./4-avoidingObjectMutations"

export const ADD_TODO = "ADD_TODO"

export interface AddTodoAction {
  type: typeof ADD_TODO
  id: number
  text: string
}

export const todoReducer: Reducer<Todo[], AddTodoAction> = (
  state = [],
  action
) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        },
      ]

    default:
      return state
  }
}
