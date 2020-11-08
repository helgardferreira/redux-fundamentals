import { Reducer } from "redux"
import { TodoType } from "../../types/TodoType"
import { TodoAction, ADD_TODO, TOGGLE_TODO } from "../actions"
import { todoReducer } from "./todoReducer"

export const todosReducer: Reducer<TodoType[], TodoAction> = (
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
