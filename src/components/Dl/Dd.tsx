import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export const Dd = ({ children }:Props) => {
  return (
    <dt className="w-full flex items-center px-5 bg-slate-100">
      { children }
    </dt>
  )
}
