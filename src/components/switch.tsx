import React from "react"
import { RouterContext } from "../context"
import { Route } from "./route"
import { matchPath, MatchPathResult } from "../utils"

export interface Switch {
  children: React.ReactElement<Route>[]
}

export const Switch = ({ children }: Switch) => {
  return (
    <RouterContext.Consumer>
      {context => {
        const location = context.location
        let element: React.ReactElement<Route>, match: MatchPathResult

        React.Children.forEach(children, child => {
          if (match == null && React.isValidElement(child)) {
            element = child
            const path = child.props.path

            match = path
              ? matchPath(location.pathname, { ...child.props, path })
              : context.match
          }
        })

        return match
          ? React.cloneElement(element, { location, computedMatch: match })
          : null
      }}
    </RouterContext.Consumer>
  )
}
