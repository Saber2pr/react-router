/*
 * @Author: saber2pr
 * @Date: 2019-10-15 22:03:58
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-10-15 23:18:39
 */
export type Options = {
  path: string
  exact?: boolean
}

export function matchPath(pathname: string, options: Options) {
  const { path, exact = false } = options
  const url = path

  if (!pathname.startsWith(url)) return

  const isExact = pathname === path
  if (exact && !isExact) return null

  return {
    path,
    url: path === "/" && url === "" ? "/" : url,
    isExact
  }
}
