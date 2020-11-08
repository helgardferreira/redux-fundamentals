import React, { FunctionComponent } from "react"

const LinkFC: FunctionComponent<{
  active: boolean
  onClick: () => void
}> = ({ active, children, onClick }) => {
  if (active) return <span>{children}</span>

  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </a>
  )
}

export default LinkFC
