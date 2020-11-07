import { AnyAction, createStore } from "redux"

export const counter = (state = 0, action: AnyAction): number => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1
    case "DECREMENT":
      return state - 1
    default:
      return state
  }
}

const store = createStore(counter)

const render = () => {
  document.body.innerText = store.getState().toString()
}

store.subscribe(() => {
  render()
})

render()

document.addEventListener("click", () => {
  store.dispatch({ type: "INCREMENT" })
})
