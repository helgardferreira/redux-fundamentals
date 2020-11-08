export const ADD_TODO = "ADD_TODO"

export interface AddTodoAction {
  type: typeof ADD_TODO
  id: number
  text: string
}
