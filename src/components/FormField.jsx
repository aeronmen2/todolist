import Input from "@/components/Input"
import classNames from "classnames"
import { useField } from "formik"

const ColorField = (props) => (
  <span className="flex gap-2">
    <Input {...props} type="text" className="grow" />
  </span>
)

const FormField = (props) => {
  const {
    as = Input,
    name,
    label,
    placeholder,
    className,
    ...otherProps
  } = props
  const [field, { error, touched }] = useField({ name })
  const Component = otherProps.type === "color" ? ColorField : as

  return (
    <label className={classNames("flex flex-col gap-2", className)}>
      <span>{label}</span>
      <Component
        {...field}
        {...otherProps}
        placeholder={placeholder ?? label}
      />
      {error && touched ? (
        <span className="text-red-600 text-sm">{error}</span>
      ) : null}
    </label>
  )
}

export default FormField
