import { useActiveListContext } from "@/pages/_app"
import { useCallback } from "react"

const ListTab = (props) => {
  const { listItem, countItemsDone, countItemsInProgress } = props
  // eslint-disable-next-line no-unused-vars
  const [activeList, setActiveList] = useActiveListContext()

  const handleActiveList = useCallback(() => {
    setActiveList(listItem)
  }, [setActiveList, listItem])

  return (
    <>
      {activeList.id === listItem.id ? (
        <button
          key={listItem.id}
          onClick={() => {
            handleActiveList()
          }}
          className="flex p-2 font-bold border-t border-l border-r z-1 border-b-4 rounded-t-lg transition duration-150 ease-in-out cursor-pointer hover:bg-slate-100"
        >
          {listItem.name}
          <div className="flex ml-3 mt-auto mb-auto">
            <span className="w-6 h-6 bg-green-600 rounded-l-xl text-white">
              {countItemsDone}
            </span>
            <span className="w-6 h-6 bg-blue-600 rounded-r-xl text-white">
              {countItemsInProgress}
            </span>
          </div>
        </button>
      ) : (
        <>
          <button
            key={listItem.id}
            onClick={() => {
              handleActiveList()
            }}
            className="flex p-2 font-bold border-t border-l border-r z-0 rounded-t-lg transition duration-150 ease-in-out cursor-pointer hover:bg-slate-100"
          >
            {listItem.name}
          </button>
        </>
      )}
    </>
  )
}

export default ListTab
