/*
 * @Author: saber2pr
 * @Date: 2019-10-15 22:46:07
 * @Last Modified by:   saber2pr
 * @Last Modified time: 2019-10-15 22:46:07
 */
import React from "react"

export type Location = {
  pathname: string
}

export type History = {
  listen(callback: (location: Location) => void): VoidFunction
  location: Location
  push(url: string): void
}

export const RouterContext = React.createContext<{
  history: History
  location: Location
  match: any
}>({
  history: null,
  location: null,
  match: null
})
