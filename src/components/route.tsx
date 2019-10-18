/*
 * @Author: saber2pr
 * @Date: 2019-10-15 21:46:06
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-10-15 23:26:09
 */
import React from "react"
import { RouterContext, Location } from "../context"
import { matchPath, MatchPathResult } from "../utils"

export interface Route {
  path: string
  exact?: boolean
  component: React.ComponentType<any>
  location?: Location
  computedMatch?: MatchPathResult
}

export const Route = ({ component: C, ...options }: Route) => {
  return (
    <RouterContext.Consumer>
      {context => {
        const location = context.location
        const match = matchPath(location.pathname, options)
        const props = { ...context, location, match }
        if (props.match) {
          return <C {...props} />
        }
      }}
    </RouterContext.Consumer>
  )
}
