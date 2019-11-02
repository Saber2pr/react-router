import React, { CSSProperties } from "react"
import { RouterContext, Location } from "../context"
import { matchPath, MatchPathResult } from "../utils"
import { Link } from "./link"

function joinClassnames(...classnames: string[]) {
  return classnames.filter(i => i).join(" ")
}

export interface NavLink extends Link {
  activeClassName?: string
  activeStyle?: CSSProperties
  className?: string
  exact?: boolean
  isActive?: (match: MatchPathResult, location: Location) => boolean
  style?: CSSProperties
}

export function NavLink({
  activeClassName = "active",
  activeStyle,
  className: classNameProp,
  exact,
  isActive: isActiveProp,
  style: styleProp,
  to,
  ...rest
}: NavLink) {
  return (
    <RouterContext.Consumer>
      {context => {
        const currentLocation = context.location
        const { pathname: pathToMatch } = currentLocation

        const escapedPath =
          to && to.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1")

        const match = escapedPath
          ? matchPath(pathToMatch, { path: escapedPath, exact })
          : null

        const isActive = !!(isActiveProp
          ? isActiveProp(match, context.location)
          : match)

        const className = isActive
          ? joinClassnames(classNameProp, activeClassName)
          : classNameProp

        const style = isActive ? { ...styleProp, ...activeStyle } : styleProp

        return <Link className={className} style={style} to={to} {...rest} />
      }}
    </RouterContext.Consumer>
  )
}
