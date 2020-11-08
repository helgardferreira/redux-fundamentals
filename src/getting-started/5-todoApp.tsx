import React, { Component } from "react"
import ReactDOM from "react-dom"
import { createStore, combineReducers, Reducer } from "redux"
import { Provider } from "react-redux"
import { Todo } from "./4-avoidingObjectMutations"
import VisibleTodoList from "./components/VisibleTodoList"
import FooterFC from "./components/FooterFC"
import AddTodoFC from "./components/AddTodoFC"

export const ADD_TODO = "ADD_TODO"
export const TOGGLE_TODO = "TOGGLE_TODO"
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER"

/* const nullReducer = () => {
  return
} */

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

export interface TodoState {
  todos?: Todo[]
  visibilityFilter?: string
}

export type TodoAppAction = TodoAction | VisibilityFilterAction

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

const visibilityFilterReducer: Reducer<string, VisibilityFilterAction> = (
  state = "SHOW_ALL",
  action
) => {
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

const todoAppReducer = combineReducers({
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

/* interface TodoAppProps {
  todos: Todo[]
  visibilityFilter: string
} */

class TodoApp extends Component {
  render() {
    return (
      <>
        <AddTodoFC />
        <VisibleTodoList />
        <FooterFC />
      </>
    )
  }
}

// This approach is no longer necessary since the container components will
// re-render when the store changes instead of the entire app re-rendering
// when the store changes
/* const render = () => {
  if (document.getElementById("root")) {
    ReactDOM.render(
      <TodoApp
        {...store.getState()}
      />,
      document.getElementById("root")
    )
  }
}

store.subscribe(render)
render() */

if (document.getElementById("root"))
  ReactDOM.render(
    <Provider store={createStore(todoAppReducer)}>
      <TodoApp />
    </Provider>,
    document.getElementById("root")
  )

/* function printCurrentTodoState(
  store: Store<TodoAppState, TodoAppAction>,
  label = "Current state:"
) {
  console.log(label)
  console.log(store.getState())
  console.log("--------------")
}

printCurrentTodoState(store, "Initial state:")

console.log("Dispatching ADD_TODO")
store.dispatch({
  type: ADD_TODO,
  id: 0,
  text: "Learn Redux",
})
printCurrentTodoState(store)

console.log("Dispatching ADD_TODO")
store.dispatch({
  type: ADD_TODO,
  id: 1,
  text: "Learn Redux-Observables",
})
printCurrentTodoState(store)

console.log("Dispatching TOGGLE_TODO")
store.dispatch({
  type: TOGGLE_TODO,
  id: 0,
})
printCurrentTodoState(store)

console.log("Dispatching SET_VISIBILITY_FILTER")
store.dispatch({
  type: SET_VISIBILITY_FILTER,
  filter: "SHOW_COMPLETED",
})
printCurrentTodoState(store) */
