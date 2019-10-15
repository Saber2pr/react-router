import { useHistory } from "./useHistory"
import { getHash } from "../utils"

export const usePush = (): [typeof history.push, () => string] => {
  const history = useHistory()
  return [history.push, getHash]
}
