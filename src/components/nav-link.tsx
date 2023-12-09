import React, { CSSProperties } from "react"
import { RouterContext } from "../context"
import { Link } from "./link"

function joinClassnames(...classnames: string[]) {
  return classnames.filter(i => i).join(" ")
}

export interface NavLink extends Link {
  activeClassName?: string
  activeStyle?: CSSProperties
  className?: string
  exact?: boolean
  isActive?: (to: string, contextPath: string) => boolean
  style?: CSSProperties
  useBrowserLink?: boolean
}

export function NavLink({
  activeClassName = "active",
  activeStyle,
  className: classNameProp,
  exact,
  isActive: isActiveProp,
  style: styleProp,
  to,
  useBrowserLink,
  ...rest
}: NavLink) {
  return (
    <RouterContext.Consumer>
      {context => {
        const currentLocation = context.location
        const { pathname: pathToMatch } = currentLocation

        const isActive = isActiveProp
          ? isActiveProp(to, pathToMatch)
          : to === pathToMatch

        const className = isActive
          ? joinClassnames(classNameProp, activeClassName)
          : classNameProp

        const style = isActive ? { ...styleProp, ...activeStyle } : styleProp

        if(useBrowserLink) {
          return <a className={className} style={style} href={to} {...rest}  />
        }
        return <Link className={className} style={style} to={to} {...rest} />
      }}
    </RouterContext.Consumer>
  )
}
