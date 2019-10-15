/*
 * @Author: saber2pr
 * @Date: 2019-10-15 23:20:40
 * @Last Modified by:   saber2pr
 * @Last Modified time: 2019-10-15 23:20:40
 */
import { useContext } from "react"
import { RouterContext } from "../context"

export const useHistory = () => {
  const { history } = useContext(RouterContext)
  return history
}
