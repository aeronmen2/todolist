import ContextProvider from "@/components/ContextProvider"
import "@/styles.css"
import TodoList from "@/components/TodoList"
import { createContext, useContext as useNativeContext, useState } from "react"
import { useRouter } from "next/router"

export const initialList = [
  {
    id: 1,
    name: "Work Classes",
    todo: [
      {
        text: "Install Next.js for the start of the project",
        checked: true,
      },
      {
        text: "Buy a suit for the conference",
        checked: false,
      },
    ],
  },
  {
    id: 2,
    name: "House Cleaning",
    todo: [
      {
        text: "Clean bedroom and kitchen",
        checked: false,
      },
      {
        text: "Take out the garbage",
        checked: true,
      },
    ],
  },
]

export const ActiveListContext = createContext()
export const useActiveListContext = () => useNativeContext(ActiveListContext)

const App = ({ Component, pageProps }) => {
  const [activeList, setActiveList] = useState(initialList[0])
  const router = useRouter()

  return (
    <ActiveListContext.Provider value={[activeList, setActiveList]}>
      <ContextProvider>
        {router.asPath === "/" ? <TodoList /> : <Component {...pageProps} />}
      </ContextProvider>
    </ActiveListContext.Provider>
  )
}

export default App
