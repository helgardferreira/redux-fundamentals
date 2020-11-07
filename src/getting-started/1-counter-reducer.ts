import { AnyAction } from "redux"

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
