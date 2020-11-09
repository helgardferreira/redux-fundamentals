import React, { FunctionComponent } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  VisibilityFilterAction,
  SET_VISIBILITY_FILTER,
} from "../store/actions/visibilityFilterAction"
import RootState from "../types/RootState"
import LinkFC from "./LinkFC"

const setVisibilityFilter = (filter: string): VisibilityFilterAction => ({
  type: SET_VISIBILITY_FILTER,
  filter,
})

const FilterLink: FunctionComponent<{ filter: string }> = ({
  filter,
  children,
}) => {
  const dispatch = useDispatch()
  const visibilityFilter = useSelector<RootState, string>(
    state => state.visibilityFilter
  )

  return (
    <LinkFC
      active={filter === visibilityFilter}
      onClick={() => dispatch(setVisibilityFilter(filter))}
    >
      {children}
    </LinkFC>
  )
}

/* const mapStateToProps = (
  state: { visibilityFilter: string },
  ownProps: {
    filter: string
    children: ReactNode
  }
) => ({
  active: state.visibilityFilter === ownProps.filter,
})

const mapDispatchToProps = (
  dispatch: Dispatch<VisibilityFilterAction>,
  ownProps: { filter: string }
) => ({
  onClick: () => dispatch(setVisibilityFilter(ownProps.filter)),
})

const FilterLink = connect(mapStateToProps, mapDispatchToProps)(LinkFC) */

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
