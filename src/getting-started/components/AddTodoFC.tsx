import React, { useRef } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { AddTodoAction, ADD_TODO } from "../store/actions"

type AddTodoDispatch = Dispatch<AddTodoAction>

interface AddTodoProps {
  dispatch: AddTodoDispatch
}

let nextId = 0
const addTodo = (text: string): AddTodoAction => ({
  type: ADD_TODO,
  id: nextId++,
  text,
})

// Use null for mapStateToProps if the component doesn't need to connect to the store
const AddTodoFC = connect(null, (dispatch: AddTodoDispatch) => ({ dispatch }))(
  ({ dispatch }: AddTodoProps) => {
    const input = useRef<HTMLInputElement>(null)

    return (
      <>
        <input type="text" ref={input} />
        <button
          onClick={() => {
            dispatch(addTodo(input.current ? input.current.value : ""))

            if (input.current) {
              input.current.value = ""
              input.current.focus()
            }
          }}
        >
          Add Todo
        </button>
      </>
    )
  }
)

/* const AddTodoFC: FunctionComponent = () => {
  const input = useRef<HTMLInputElement>(null)
  // const store = useContext(StoreContext)
  const { store } = useContext(ReactReduxContext)

  return (
    <>
      <input type="text" ref={input} />
      <button
        onClick={() => {
          store.dispatch({
            type: ADD_TODO,
            id: nextToDoId++,
            text: input.current ? input.current.value : "",
          })

          if (input.current) {
            input.current.value = ""
            input.current.focus()
          }
        }}
      >
        Add Todo
      </button>
    </>
  )
} */

export default AddTodoFC
