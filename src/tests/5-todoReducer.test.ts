import { Todo } from "../getting-started/4-avoidingObjectMutations"
import {
  AddTodoAction,
  todoReducer,
  ToggleTodoAction,
} from "../getting-started/5-todoReducer"
import deepFreeze from "../utils/deepFreeze"

test("adds todo to list", () => {
  const stateBefore: Todo[] = []

  const action: AddTodoAction = {
    type: "ADD_TODO",
    id: 0,
    text: "Learn Redux",
  }

  deepFreeze(stateBefore)
  deepFreeze(action)

  const stateAfter: Todo[] = [
    {
      id: 0,
      text: "Learn Redux",
      completed: false,
    },
  ]

  expect(todoReducer(stateBefore, action)).toEqual(stateAfter)
})

test("toggles todo in list", () => {
  const stateBefore: Todo[] = [
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

  const stateAfter: Todo[] = [
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

  expect(todoReducer(stateBefore, action)).toEqual(stateAfter)
})
