import {
  Todo,
  toggleTodo,
} from "../getting-started/4-avoiding-object-mutations"
import deepFreeze from "../utils/deepFreeze"

test("toggles todo", () => {
  const todoBefore: Todo = { id: 0, text: "test", completed: false }
  const todoAfter: Todo = { id: 0, text: "test", completed: true }

  deepFreeze(todoBefore)

  expect(toggleTodo(todoBefore)).toEqual(todoAfter)
})
