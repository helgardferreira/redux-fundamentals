import React, { Component, FunctionComponent, useRef } from "react"
import ReactDOM from "react-dom"
import { createStore, combineReducers, Reducer, Unsubscribe } from "redux"
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

const todoAppReducer = combineReducers({
  todos: todosReducer,
  visibilityFilter: visibilityFilterReducer,
})

const store = createStore(todoAppReducer)

/* const todoAppReducer: Reducer<TodoAppState, TodoAppAction> = (state = {}, action) => {
  return {
    todos: todosReducer(state.todos, action as TodoAction),
    visibilityFilter: visibilityFilterReducer(
      state.visibilityFilter,
      action as VisibilityFilterAction
    ),
  }
} */

// Predicate to determine if todo should be visible
/* const isTodoVisible = (filter: string) => (todo: Todo) => {
  switch (filter) {
    case "SHOW_ALL":
      return true
    case "SHOW_ACTIVE":
      return !todo.completed
    case "SHOW_COMPLETED":
      return todo.completed
    default:
      return true
  }
} */

const getVisibleTodos = (todos: Todo[], filter: string) => {
  switch (filter) {
    case "SHOW_ALL":
      return todos
    case "SHOW_ACTIVE":
      return todos.filter(todo => !todo.completed)
    case "SHOW_COMPLETED":
      return todos.filter(todo => todo.completed)
    default:
      return todos
  }
}

// Presentational components
const TodoFC: FunctionComponent<{
  completed: boolean
  onClick: () => any
  text: string
}> = ({ completed, text, onClick }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? "line-through" : "none",
      cursor: "pointer",
      fontSize: 20,
    }}
  >
    {text}
  </li>
)

const TodoListFC: FunctionComponent<{
  todos: Todo[]
  onTodoClick: (id: number) => void
}> = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(({ completed, id, text }) => (
      <TodoFC
        key={id}
        completed={completed}
        text={text}
        onClick={() => onTodoClick(id)}
      />
    ))}
  </ul>
)

const AddTodoFC: FunctionComponent<{
  onAddClick: (value: string | undefined) => void
}> = ({ onAddClick }) => {
  const input = useRef<HTMLInputElement>(null)

  return (
    <>
      <input type="text" ref={input} />
      <button
        onClick={() => {
          onAddClick(input.current?.value)

          if (input.current) {
            input.current.value = ""
            input.current.focus()
          }
        }}
      >
        Add Todo
      </button>
    </>
  )
}

const LinkFC: FunctionComponent<{
  active: boolean
  onClick: () => void
}> = ({ active, children, onClick }) => {
  if (active) return <span>{children}</span>

  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </a>
  )
}

// Container component
class FilterLink extends Component<{ filter: string }> {
  private unsubscribe: Unsubscribe = () => {
    return
  }

  // Anytime the store changes this container component will re-render
  // thanks to forceUpdate()
  componentDidMount() {
    store.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { filter, children } = this.props
    const state = store.getState()

    return (
      <LinkFC
        active={filter === state.visibilityFilter}
        onClick={() =>
          store.dispatch({
            type: SET_VISIBILITY_FILTER,
            filter,
          })
        }
      >
        {children}
      </LinkFC>
    )
  }
}

const FooterFC: FunctionComponent = () => (
  <footer>
    Show: <FilterLink filter="SHOW_ALL">All</FilterLink>
    {", "}
    <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
    {", "}
    <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
  </footer>
)

interface TodoAppProps {
  todos: Todo[]
  visibilityFilter: string
}

let nextToDoId = 0
class TodoApp extends Component<TodoAppProps> {
  render() {
    const { todos, visibilityFilter } = this.props

    return (
      <>
        <AddTodoFC
          onAddClick={value => {
            store.dispatch({
              type: ADD_TODO,
              id: nextToDoId++,
              text: value ? value : "",
            })
          }}
        />
        <TodoListFC
          todos={getVisibleTodos(todos, visibilityFilter)}
          onTodoClick={(id: number) => {
            store.dispatch({
              type: TOGGLE_TODO,
              id,
            })
          }}
        />
        <FooterFC />
      </>
    )
  }
}

const render = () => {
  if (document.getElementById("root")) {
    ReactDOM.render(
      <TodoApp
        /* todos={store.getState().todos}
        visibilityFilter={store.getState().visibilityFilter} */
        {...store.getState()}
      />,
      document.getElementById("root")
    )
  }
}

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
