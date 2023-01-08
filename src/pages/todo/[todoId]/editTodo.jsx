import { useContext } from "@/components/ContextProvider"
import ToDoForm from "@/components/ToDoForm"
import { useActiveListContext } from "@/pages/_app"
import { useRouter } from "next/router.js"
import { useCallback } from "react"

const EditTodo = () => {
  // eslint-disable-next-line no-unused-vars
  const [activeList, setActiveList] = useActiveListContext()
  const { setList, list } = useContext()
  const router = useRouter()

  const todoId = parseInt(router.query.todoId)

  const editTodo = useCallback(
    (todoId, values) => {
      setList(
        list.map((element) => {
          if (element.id === activeList.id) {
            element.todo = element.todo.map((todo, index) => {
              if (index === todoId) {
                todo.text = values.name
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

  const handleSubmit = useCallback(
    (values) => {
      editTodo(todoId, values)
      router.push(`/`)
    },
    [router, editTodo, todoId]
  )

  return <ToDoForm onSubmit={handleSubmit} />
}

export default EditTodo
