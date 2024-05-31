type Props = {
  label: string
}

export const NomalTag = ({
  label
}: Props) => {
  return (
    <span className="text-white bg-sky-500 pb-2 pt-1 px-3 rounded-md items-center mr-2">
      <span className="h-2 w-2 mr-2 rounded-lg bg-white inline-block"></span>
      { label }
    </span>
  )
}
