interface Todo {
  id: number
  text: string
  completed: boolean
}

export const toggleTodo = (todo: Todo): Todo => {
  /* return Object.assign({}, todo, {
    completed: !todo.completed,
  }) */

  // More concise implementation with the (...) spread operator
  return {
    ...todo,
    completed: !todo.completed,
  }
}
