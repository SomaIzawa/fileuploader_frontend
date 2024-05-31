import { ChangeEvent, ReactNode } from "react"

type Props = {
  value: string
  id: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  children: ReactNode
}

export const FormSelect = ({
  value,
  id,
  onChange,
  children,
} :Props) => {
  return (
    <div>
      <select 
        name="" 
        id={id} 
        value={value} 
        onChange={onChange}
        className="mb-2 w-full px-2 py-2 outline-none border-slate-400 border-solid border-b-2">
        { children }
      </select>
    </div>
  )
}