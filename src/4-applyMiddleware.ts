import {
  applyMiddleware,
  // combineReducers,
  createStore,
  // compose,
  // applyMiddleware,
  Middleware,
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

const logger: Middleware = ({ getState }) => {
  return next => action => {
    console.log("MIDDLEWARE", getState(), action)

    const value = next(action)
    return value
  }
}

const store = createStore(reducer, applyMiddleware(logger))
