import React, { FunctionComponent } from "react"
import FilterLink from "./FilterLink"

const FooterFC: FunctionComponent = () => (
  <footer>
    Show: <FilterLink filter="SHOW_ALL">All</FilterLink>
    {", "}
    <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
    {", "}
    <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
  </footer>
)

export default FooterFC
