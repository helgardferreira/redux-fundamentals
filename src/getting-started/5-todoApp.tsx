import React, { Component } from "react"
import ReactDOM from "react-dom"
import { createStore } from "redux"
import { Provider } from "react-redux"
import VisibleTodoList from "./components/VisibleTodoList"
import FooterFC from "./components/FooterFC"
import AddTodoFC from "./components/AddTodoFC"
import { todoAppReducer } from "./store/reducers"

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
