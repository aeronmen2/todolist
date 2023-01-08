import {
  createContext,
  useCallback,
  useContext as useNativeContext,
  useState,
} from "react"
import { initialList } from "@/pages/_app"

export const Context = createContext()
export const useContext = () => useNativeContext(Context)

const ContextProvider = (props) => {
  const [nextListId, setNextListId] = useState(3)
  const [list, setList] = useState(initialList)

  const getNextListId = useCallback(() => {
    setNextListId(nextListId + 1)

    return nextListId
  }, [nextListId])

  const createList = useCallback(
    (list) => {
      setList((lists) => [
        ...lists,
        {
          id: getNextListId(),
          ...list,
          todo: [],
        },
      ])
    },
    [getNextListId]
  )

  const deleteList = useCallback(
    (listId) => setList((lists) => lists.filter(({ id }) => id !== listId)),
    []
  )

  const updateList = useCallback((updatedList) => {
    setList((lists) =>
      lists.map((list) => (list.id === updatedList.id ? updatedList : list))
    )
  }, [])

  return (
    <Context.Provider
      {...props}
      value={{
        list,
        createList,
        deleteList,
        updateList,
        setList,
      }}
    />
  )
}

export default ContextProvider
