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

export const todoReducer: Reducer<Todo[], TodoAction> = (
  state = [],
  action
) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        },
      ]
    case TOGGLE_TODO: {
      const index = state.findIndex(({ id }) => id === action.id)

      return state
        .slice(0, index)
        .concat({
          ...state[index],
          completed: !state[index].completed,
        })
        .concat(state.slice(index + 1))
    }

    default:
      return state
  }
}
