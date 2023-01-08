import { useContext } from "@/components/ContextProvider"
import ToDoForm from "@/components/ToDoForm"
import { useRouter } from "next/router.js"
import { useCallback } from "react"
import { useActiveListContext } from "../_app"

const CreateTodo = () => {
  const [activeList] = useActiveListContext()
  const { setList, list } = useContext()
  const router = useRouter()

  const createTodo = useCallback(
    (values) => {
      setList(
        list.map((element) => {
          if (element.id === activeList.id) {
            element.todo.push({ text: values, checked: false })
          }

          return element
        })
      )
    },
    [list, setList, activeList]
  )

  const handleSubmit = useCallback(
    (values) => {
      createTodo(values.name)
      router.push(`/`)
    },
    [router, createTodo]
  )

  return <ToDoForm onSubmit={handleSubmit} />
}

export default CreateTodo
