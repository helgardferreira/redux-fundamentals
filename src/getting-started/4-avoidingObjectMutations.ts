export const toggleTodo = (todo: {
  id: number
  text: string
  completed: boolean
}): {
  id: number
  text: string
  completed: boolean
} => {
  /* return Object.assign({}, todo, {
    completed: !todo.completed,
  }) */

  // More concise implementation with the (...) spread operator
  return {
    ...todo,
    completed: !todo.completed,
  }
}
