/*
 * @Author: saber2pr
 * @Date: 2019-10-15 21:45:45
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-11-02 21:00:00
 */
import React from "react"
import { RouterContext } from "../context"

export interface Link
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  to: string
}

export const Link = ({ to, onClick, target, ...rest }: Link) => {
  return (
    <RouterContext.Consumer>
      {context => {
        const { history } = context
        return (
          <a
            {...rest}
            href={"#" + to}
            onClick={event => {
              try {
                if (onClick) onClick(event)
              } catch (ex) {
                event.preventDefault()
                throw ex
              }

              if (!event.defaultPrevented) {
                event.preventDefault()
                history.push(to)
              }
            }}
          />
        )
      }}
    </RouterContext.Consumer>
  )
}
