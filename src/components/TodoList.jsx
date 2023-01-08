import { useContext } from "@/components/ContextProvider"
import { useCallback } from "react"
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid"
import router from "next/router"
import { useActiveListContext } from "@/pages/_app"
import Link from "next/link"
import Header from "./Header"

const TodoList = () => {
  const { deleteList, list } = useContext()
  const [activeList, setList] = useActiveListContext()

  const handleClickListDelete = useCallback(
    (event) => {
      const listId = Number.parseInt(
        event.currentTarget.getAttribute("data-list-id"),
        10
      )
      deleteList(listId)
      router.back()
    },
    [deleteList]
  )

  const deleteTodo = useCallback(
    (todoId) => {
      setList(
        list.map((element) => {
          if (element.id === activeList.id) {
            const todoIndex = element.todo.findIndex(
              (todo) => todo.id === todoId
            )
            element.todo.splice(todoIndex, 1)
          }

          return element
        })
      )
    },
    [list, setList, activeList]
  )

  const handleClickTodoDelete = useCallback(
    (event) => {
      const todoId = Number.parseInt(
        event.currentTarget.getAttribute("data-todo-id"),
        10
      )
      deleteTodo(todoId)
    },
    [deleteTodo]
  )

  const handleEditList = useCallback(() => {
    router.push("/lists/editList")
  }, [])

  const editCompleted = useCallback(
    (todoId) => {
      setList(
        list.map((element) => {
          if (element.id === activeList.id) {
            element.todo = element.todo.map((todo, index) => {
              if (index == todoId) {
                todo.checked = !todo.checked
              }

              return todo
            })
          }

          return element
        })
      )
    },
    [list, setList, activeList]
  )

  const handleClickCompleted = useCallback(
    (event) => {
      const todoId = Number.parseInt(
        event.currentTarget.getAttribute("data-todo-id"),
        10
      )
      editCompleted(todoId)
    },
    [editCompleted]
  )

  return (
    <>
      <Header />
      <div className="flex p-2 gap-2 border-b">
        <a className="">
          <PlusIcon
            onClick={() => {
              router.push("/todo/createTodo")
            }}
            className="w-6 cursor-pointer"
          />
        </a>
        <div onClick={handleEditList} className="w-6 cursor-pointer">
          <PencilSquareIcon className="w-6" />
        </div>
        <div
          className="w-6 cursor-pointer"
          data-list-id={activeList.id}
          onClick={handleClickListDelete}
        >
          <TrashIcon />
        </div>
      </div>
      {activeList.todo?.map((todo, index) => (
        <div
          className="group cursor-pointer flex border-b h-16 w-full"
          key={index}
        >
          {todo.checked === true ? (
            <span
              onClick={handleClickCompleted}
              data-todo-id={index}
              className="w-6 h-6 ml-5 mt-auto mb-auto border-2 hover:duration-100 bg-green-500 hover:bg-white"
            ></span>
          ) : (
            <span
              onClick={handleClickCompleted}
              data-todo-id={index}
              className="w-6 h-6 ml-5 mt-auto mb-auto border-2 hover:duration-300 hover:bg-green-500"
            ></span>
          )}

          <Link
            href={`/todo/${index}/editTodo`}
            className="mt-auto mb-auto ml-5"
            key={index}
          >
            {todo.text}
          </Link>

          <div className="ml-auto mt-auto mb-auto mr-5 ">
            <TrashIcon
              key={index}
              onClick={handleClickTodoDelete}
              data-todo-id={index}
              className="hidden group-hover:block w-6"
            />
          </div>
        </div>
      ))}
    </>
  )
}

export default TodoList
