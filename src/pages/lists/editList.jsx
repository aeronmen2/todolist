import { useContext } from "@/components/ContextProvider"
import ToDoForm from "@/components/ToDoForm"
import { useActiveListContext } from "@/pages/_app"
import { useRouter } from "next/router.js"
import { useCallback } from "react"

const EditList = () => {
  const { updateList, list } = useContext()
  const [activeList] = useActiveListContext()

  const router = useRouter()
  const handleSubmit = useCallback(
    (values) => {
      updateList(values)
      router.push("/")
    },
    [router, updateList]
  )

  return (
    <ToDoForm
      onSubmit={handleSubmit}
      initialValues={list.find(({ id }) => id === activeList.id)}
    />
  )
}

export default EditList
