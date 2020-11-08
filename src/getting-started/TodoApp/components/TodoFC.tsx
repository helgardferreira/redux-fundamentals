import React, { FunctionComponent } from "react"

const TodoFC: FunctionComponent<{
  completed: boolean
  onClick: () => any
  text: string
}> = ({ completed, text, onClick }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? "line-through" : "none",
      cursor: "pointer",
      fontSize: 20,
    }}
  >
    {text}
  </li>
)

export default TodoFC
