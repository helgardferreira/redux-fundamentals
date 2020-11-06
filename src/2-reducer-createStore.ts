import {
  createStore,
  // combineReducers,
  // compose,
  // applyMiddleware,
  Reducer,
} from "redux"

interface IMessage {
  type: "MESSAGE"
  payload?: {
    amount: number
  }
}

const reducer: Reducer<number, IMessage> = (state = 1, action) => {
  if (action.payload) console.log(action.payload.amount)
  return state
}

const store = createStore(reducer)
const unsubscribe = store.subscribe(() => {
  console.log("hi")
})

store.dispatch({
  type: "MESSAGE",
  payload: {
    amount: 42,
  },
})
store.dispatch({
  type: "MESSAGE",
  payload: {
    amount: 10,
  },
})

unsubscribe()

store.dispatch({
  type: "MESSAGE",
  payload: {
    amount: 4,
  },
})
