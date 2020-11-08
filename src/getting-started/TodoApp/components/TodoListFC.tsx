import React, { FunctionComponent } from "react"
import { TodoType } from "../types/TodoType"
import TodoFC from "./TodoFC"

const TodoListFC: FunctionComponent<{
  todos: TodoType[]
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
