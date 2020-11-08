import { connect } from "react-redux"
import { Dispatch } from "redux"
import { ToggleTodoAction, TOGGLE_TODO } from "../store/actions"
import { TodoType } from "../types/TodoType"
import TodoListFC from "./TodoListFC"

// Predicate to determine if todo should be visible
/* const isTodoVisible = (filter: string) => (todo: Todo) => {
  switch (filter) {
    case "SHOW_ALL":
      return true
    case "SHOW_ACTIVE":
      return !todo.completed
    case "SHOW_COMPLETED":
      return todo.completed
    default:
      return true
  }
} */

const getVisibleTodos = (todos: TodoType[], filter: string) => {
  switch (filter) {
    case "SHOW_ALL":
      return todos
    case "SHOW_ACTIVE":
      return todos.filter(todo => !todo.completed)
    case "SHOW_COMPLETED":
      return todos.filter(todo => todo.completed)
    default:
      return todos
  }
}

const toggleTodo = (id: number): ToggleTodoAction => ({ type: TOGGLE_TODO, id })

const mapStateToProps = (state: {
  todos: TodoType[]
  visibilityFilter: string
}) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter),
})

const mapDispatchToProps = (dispatch: Dispatch<ToggleTodoAction>) => ({
  onTodoClick: (id: number) => dispatch(toggleTodo(id)),
})

// Creating a container component with the use of the connect() utility
const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoListFC)

export default VisibleTodoList

// VisibleTodoList container component
/* class VisibleTodoList extends Component {
  static contextType = ReactReduxContext
  context!: React.ContextType<typeof ReactReduxContext>

  private unsubscribe: Unsubscribe = () => {
    return
  }

  // Anytime the store changes this container component will re-render
  // thanks to forceUpdate()
  componentDidMount() {
    const { store } = this.context
    store.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { store } = this.context
    const state = store.getState()

    return (
      <TodoListFC
        todos={getVisibleTodos(state.todos, state.visibilityFilter)}
        onTodoClick={(id: number) => {
          store.dispatch({
            type: TOGGLE_TODO,
            id,
          })
        }}
      />
    )
  }
} */
