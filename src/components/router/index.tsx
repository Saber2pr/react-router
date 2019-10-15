/*
 * @Author: saber2pr
 * @Date: 2019-10-15 21:46:22
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-10-15 22:25:07
 */
import React, { useEffect, useState } from "react"
import { RouterContext, History } from "../../context"

export interface Router {
  history: History
  children: JSX.Element | JSX.Element[]
}

export const Router = ({ history, children }: Router) => {
  const [state, setState] = useState({ location: history.location })
  useEffect(() => history.listen(location => setState({ location })))

  const computeRootMatch = (pathname: string) => ({
    path: "/",
    url: "/",
    isExact: pathname === "/"
  })

  return (
    <RouterContext.Provider
      value={{
        history,
        location: state.location,
        match: computeRootMatch(state.location.pathname)
      }}
      children={children}
    />
  )
}
