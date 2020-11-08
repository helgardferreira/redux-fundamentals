import { Reducer, combineReducers } from "redux"
import { TodoType } from "../types/TodoType"
import {
  TodoAction,
  ADD_TODO,
  TOGGLE_TODO,
  VisibilityFilterAction,
  SET_VISIBILITY_FILTER,
} from "./actions"

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

export const visibilityFilterReducer: Reducer<
  string,
  VisibilityFilterAction
> = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

// combineReducers() from scratch
/* function combineReducers(
  reducers: Record<string, Reducer<any, any>>
): Reducer<any, any> {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action)
      return nextState
    }, {} as { [key: string]: any })
  }
} */

export const todoAppReducer = combineReducers({
  todos: todosReducer,
  visibilityFilter: visibilityFilterReducer,
})

// const StoreContext = createContext<Store>(createStore(nullReducer))

/* const todoAppReducer: Reducer<TodoAppState, TodoAppAction> = (state = {}, action) => {
  return {
    todos: todosReducer(state.todos, action as TodoAction),
    visibilityFilter: visibilityFilterReducer(
      state.visibilityFilter,
      action as VisibilityFilterAction
    ),
  }
} */
