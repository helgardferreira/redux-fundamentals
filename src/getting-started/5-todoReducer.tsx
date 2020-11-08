import React, { Component, createRef, ReactNode, RefObject } from "react"
import ReactDOM from "react-dom"
import { createStore, combineReducers, Reducer } from "redux"
import { Todo } from "./4-avoidingObjectMutations"

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

const todoApp = combineReducers({
  todos: todosReducer,
  visibilityFilter: visibilityFilterReducer,
})

/* const todoApp: Reducer<TodoAppState, TodoAppAction> = (state = {}, action) => {
  return {
    todos: todosReducer(state.todos, action as TodoAction),
    visibilityFilter: visibilityFilterReducer(
      state.visibilityFilter,
      action as VisibilityFilterAction
    ),
  }
} */

interface TodoAppProps {
  todos: Todo[]
  // visibilityFilter: string
}

let nextToDoId = 0
class TodoApp extends Component<TodoAppProps> {
  private input: RefObject<HTMLInputElement>

  constructor(props: TodoAppProps) {
    super(props)
    this.input = createRef()
  }

  render() {
    return (
      <div>
        <input type="text" ref={this.input} />
        <button
          onClick={() => {
            store.dispatch({
              type: ADD_TODO,
              id: nextToDoId++,
              text: this.input.current ? this.input.current.value : "",
            })
            if (this.input.current) {
              this.input.current.value = ""
              this.input.current.focus()
            }
          }}
        >
          Add Todo
        </button>
        <ul>
          {this.props.todos?.map(todo => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp todos={store.getState().todos} />,
    document.getElementById("root")
  )
}

const store = createStore(todoApp)

store.subscribe(render)
render()

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
