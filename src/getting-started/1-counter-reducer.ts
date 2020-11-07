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

/* function createStore<S, A extends Action = AnyAction>(reducer: Reducer<S, A>) {
  // : Store<number, AnyAction>
  let state: S
  const listeners: (() => void)[] = []

  const getState = () => state

  const dispatch = (action: A) => {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }

  const subscribe = (listener: () => void) => {
    listeners.push(listener)
    return () =>
      void listeners.splice(
        listeners.findIndex(v => v === listener),
        1
      )
  }

  // @ts-expect-error: Default dispatch implementation
  dispatch({ type: "" })

  return {
    getState,
    dispatch,
    subscribe,
  }
} */

const store = createStore(counter)

/* const unsubscribe = store.subscribe(() => {
  console.log(store.getState())
}) */

const render = () => {
  document.body.innerText = store.getState().toString()
}

store.subscribe(() => {
  render()
})

render()

document.addEventListener("click", () => {
  store.dispatch({ type: "INCREMENT" })
  // unsubscribe()
})
