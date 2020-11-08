import {
  AddTodoAction,
  ToggleTodoAction,
} from "../../getting-started/TodoApp/store/actions"
import { todosReducer } from "../../getting-started/TodoApp/store/reducers"
import { TodoType } from "../../getting-started/TodoApp/types/TodoType"
import deepFreeze from "../../utils/deepFreeze"

test("adds todo to list", () => {
  const stateBefore: TodoType[] = []

  const action: AddTodoAction = {
    type: "ADD_TODO",
    id: 0,
    text: "Learn Redux",
  }

  deepFreeze(stateBefore)
  deepFreeze(action)

  const stateAfter: TodoType[] = [
    {
      id: 0,
      text: "Learn Redux",
      completed: false,
    },
  ]

  expect(todosReducer(stateBefore, action)).toEqual(stateAfter)
})

test("toggles todo in list", () => {
  const stateBefore: TodoType[] = [
    {
      id: 0,
      text: "Learn Redux",
      completed: false,
    },
    {
      id: 3,
      text: "Learn Redux",
      completed: false,
    },
    {
      id: 10,
      text: "Learn Redux",
      completed: false,
    },
  ]

  const action: ToggleTodoAction = {
    type: "TOGGLE_TODO",
    id: 3,
  }

  deepFreeze(stateBefore)
  deepFreeze(action)

  const stateAfter: TodoType[] = [
    {
      id: 0,
      text: "Learn Redux",
      completed: false,
    },
    {
      id: 3,
      text: "Learn Redux",
      completed: true,
    },
    {
      id: 10,
      text: "Learn Redux",
      completed: false,
    },
  ]

  expect(todosReducer(stateBefore, action)).toEqual(stateAfter)
})
