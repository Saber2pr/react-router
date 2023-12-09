/*
 * @Author: saber2pr
 * @Date: 2019-10-15 22:18:38
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-10-15 22:59:53
 */
import { getHash } from "../utils"

export type Location = {
  pathname: string
}

export type Listener = (location: Location) => void

export type History = {
  listen(listener: Listener): VoidFunction
  location: Location
  push(url: string): void
}

export const createLocation = (): Location => {
  if (window.location.hash) {
    return { pathname: getHash() }
  } else {
    window.location.hash = "/"
    return { pathname: "/" }
  }
}

export const createHashHistory = (): History => {
  const listeners: Listener[] = []
  const listen = (listener: Listener): VoidFunction => {
    listeners.push(listener)
    return () => listeners.splice(listeners.indexOf(listener), 1)
  }

  const push = (pathname: string) => {
    window.location.hash = pathname
    listeners.forEach(listener => listener({ ...location, pathname }))
  }

  const location = createLocation()
  window.addEventListener("popstate", () => push(getHash()))

  return {
    listen,
    location,
    push
  }
}
