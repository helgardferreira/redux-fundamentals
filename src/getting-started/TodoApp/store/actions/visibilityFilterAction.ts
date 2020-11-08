export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER"

export interface VisibilityFilterAction {
  type: typeof SET_VISIBILITY_FILTER
  filter: string
}
