import React, { ReactNode } from "react"

type Props = {
  children: ReactNode
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export const Form = ({
  children,
  onSubmit
}: Props) => {
  return (
    <form onSubmit={onSubmit} className="rounded-md py-7 px-10 shadow-md">
      { children }
    </form>
  )
}
