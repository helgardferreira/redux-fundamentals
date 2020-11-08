import { toggleTodo } from "../getting-started/4-avoidingObjectMutations"
import deepFreeze from "../utils/deepFreeze"

test("toggles todo", () => {
  const todoBefore: { id: number; text: string; completed: boolean } = {
    id: 0,
    text: "test",
    completed: false,
  }
  const todoAfter: { id: number; text: string; completed: boolean } = {
    id: 0,
    text: "test",
    completed: true,
  }

  deepFreeze(todoBefore)

  expect(toggleTodo(todoBefore)).toEqual(todoAfter)
})
