import { Todo } from "../getting-started/4-avoidingObjectMutations"
import { AddTodoAction, todoReducer } from "../getting-started/5-todoReducer"
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
