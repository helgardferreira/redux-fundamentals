import { ReactNode } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { SET_VISIBILITY_FILTER, VisibilityFilterAction } from "../5-todoApp"
import LinkFC from "./LinkFC"

const mapStateToProps = (
  state: { visibilityFilter: string },
  ownProps: {
    filter: string
    children: ReactNode
  }
) => {
  return {
    active: state.visibilityFilter === ownProps.filter,
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<VisibilityFilterAction>,
  ownProps: { filter: string }
) => {
  return {
    onClick: () =>
      dispatch({ type: SET_VISIBILITY_FILTER, filter: ownProps.filter }),
  }
}

const FilterLink = connect(mapStateToProps, mapDispatchToProps)(LinkFC)

// FilterLink container component
/* class FilterLink extends Component<{ filter: string }> {
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
    const { filter, children } = this.props
    const { store } = this.context
    const state = store.getState()

    return (
      <LinkFC
        active={filter === state.visibilityFilter}
        onClick={() =>
          store.dispatch({
            type: SET_VISIBILITY_FILTER,
            filter,
          })
        }
      >
        {children}
      </LinkFC>
    )
  }
} */

export default FilterLink
