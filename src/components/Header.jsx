import { useContext } from "./ContextProvider"
import Link from "@/components/Link"
import { PlusIcon } from "@heroicons/react/24/solid"
import ListTab from "./ListTab"

const Header = () => {
  const { list } = useContext()

  return (
    <>
      <div className="overflow-x-auto flex border-b mt-2 overflow-visible bg-white">
        {list?.map((list) => (
          <ListTab
            key={list.id}
            listItem={list}
            countItemsDone={
              list.todo.filter((todo) => todo.checked === true).length
            }
            countItemsInProgress={list.todo.length}
          />
        ))}
        <Link
          className="p-2 border-t border-r border-l rounded-t-lg ml-2 cursor-pointer"
          href="/lists/createList"
        >
          <PlusIcon className="w-6" />
        </Link>
      </div>
    </>
  )
}

export default Header
