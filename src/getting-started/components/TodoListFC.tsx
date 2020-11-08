import React, { FunctionComponent } from "react"
import { Todo } from "../types/Todo"
import TodoFC from "./TodoFC"

const TodoListFC: FunctionComponent<{
  todos: Todo[]
  onTodoClick: (id: number) => void
}> = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(({ completed, id, text }) => (
      <TodoFC
        key={id}
        completed={completed}
        text={text}
        onClick={() => onTodoClick(id)}
      />
    ))}
  </ul>
)

export default TodoListFC
