import FormField from "@/components/FormField"
import classNames from "classnames"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { XMarkIcon } from "@heroicons/react/24/solid"
import * as yup from "yup"

const defaultInitialValues = {
  name: "",
}

const defaultValidationSchema = yup.object().shape({
  name: yup.string().min(8).max(60).required().label("Description"),
})

const ToDoForm = (props) => {
  const {
    className,
    onSubmit,
    initialValues = defaultInitialValues,
    validationSchema = defaultValidationSchema,
  } = props
  const router = useRouter()

  return (
    <>
      <div className="flex border-b">
        {router.asPath === "/lists/editList" ? (
          <h1 className="font-bold p-4 text-3xl">Edit a list</h1>
        ) : (
          <h1 className="font-bold p-4 text-3xl">Create a list</h1>
        )}

        <XMarkIcon
          onClick={() => router.back()}
          className="w-10 ml-auto mr-2 cursor-pointer"
        />
      </div>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form className={classNames("", className)}>
          <FormField
            className="mt-4 ml-4 mr-4 mb-4"
            name="name"
            label="Description"
          />
          <div className="fixed bottom-0 right-0 mb-10 mr-10">
            <span className="pr-5 cursor-pointer" onClick={() => router.back()}>
              Cancel
            </span>

            {router.asPath === "/lists/editList" ? (
              <button
                type="submit"
                className="rounded-2xl text-white	 bg-blue-700 p-4 "
              >
                Edit
              </button>
            ) : (
              <button
                type="submit"
                className="rounded-xl text-white	 bg-blue-700 p-3"
              >
                Create
              </button>
            )}
          </div>
        </Form>
      </Formik>
    </>
  )
}

export default ToDoForm
