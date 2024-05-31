import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export const Dl = ({ children }:Props) => {
  return (
    <dl className="w-full h-10 flex border-solid border-b border-white">
      { children }
    </dl>
  )
}
