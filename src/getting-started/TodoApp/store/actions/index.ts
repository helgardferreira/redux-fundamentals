import { AddTodoAction } from "./addTodoAction"
import { ToggleTodoAction } from "./toggleTodoAction"
import { VisibilityFilterAction } from "./visibilityFilterAction"

export type TodoAction = AddTodoAction | ToggleTodoAction

export type TodoAppAction = TodoAction | VisibilityFilterAction
