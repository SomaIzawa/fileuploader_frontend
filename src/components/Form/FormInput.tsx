import { ChangeEvent } from "react"

type Props = {
  value: string
  id: string
  placeholder?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const FormInput = ({
  value,
  id,
  placeholder = "",
  onChange,
} :Props) => {
  return (
    <div>
      <input 
      type="text" 
      id={id} 
      autoFocus
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="mb-2 w-full px-2 py-2 outline-none border-slate-400 border-solid border-b-2"/>
    </div>
  )
}