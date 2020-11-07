import {
  combineReducers,
  // createStore,
  // compose,
  // applyMiddleware,
  Reducer,
} from "redux"

interface IMathState {
  value: number
}

interface IMathAction {
  type: string
  payload: {
    amount: number
  }
}

type CalculatorReducer = Reducer<IMathState, IMathAction>

const calculatorReducer: CalculatorReducer = (state = { value: 1 }, action) => {
  if (action.type === "ADD") {
    const value = state.value
    const amount = action.payload.amount
    return {
      value: value + amount,
    }
  }

  return state
}

const reducer = combineReducers({
  calculator: calculatorReducer,
})

console.log(reducer)
