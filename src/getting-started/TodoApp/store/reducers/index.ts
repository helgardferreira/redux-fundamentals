import { combineReducers } from "redux"
import { todosReducer } from "./todosReducer"
import { visibilityFilterReducer } from "./visibilityFilterReducer"

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
