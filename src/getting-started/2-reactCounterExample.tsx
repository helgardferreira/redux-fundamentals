import React from "react"
import ReactDOM from "react-dom"
import { AnyAction, createStore } from "redux"
import { FunctionComponent } from "react"

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

interface CounterProps {
  value: number
  onIncrement(): void
  onDecrement(): void
}

const Counter: FunctionComponent<CounterProps> = ({
  value,
  onIncrement,
  onDecrement,
}) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
)

const store = createStore(counter)

const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => void store.dispatch({ type: "INCREMENT" })}
      onDecrement={() => void store.dispatch({ type: "DECREMENT" })}
    />,
    document.getElementById("root")
  )
}

render()

store.subscribe(() => {
  render()
})
