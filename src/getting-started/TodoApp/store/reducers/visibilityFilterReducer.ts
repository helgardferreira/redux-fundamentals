import { Reducer } from "redux"
import { VisibilityFilterAction, SET_VISIBILITY_FILTER } from "../actions"

export const visibilityFilterReducer: Reducer<
  string,
  VisibilityFilterAction
> = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}
