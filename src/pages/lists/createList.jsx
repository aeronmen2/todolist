import { useContext } from "@/components/ContextProvider"
import ToDoForm from "@/components/ToDoForm"
import { useRouter } from "next/router.js"
import { useCallback } from "react"

const CreateList = () => {
  const { createList } = useContext()
  const router = useRouter()

  const handleSubmit = useCallback(
    (values) => {
      createList(values)
      router.push(`/`)
    },
    [router, createList]
  )

  return <ToDoForm onSubmit={handleSubmit} />
}

export default CreateList
