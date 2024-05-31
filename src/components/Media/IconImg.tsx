type Props = {
  src: string
  alt: string
  size?: "l" | "m" | "s"
}

export const IconImg = ({
  src="",
  alt="",
  size="m"
}:Props) => {
  let height = ""
  switch (size) {
    case "l":
      height = "h-20"
    break;
    case "m":
      height = "h-14"
    break;
    case "s":
      height = "h-8"
    break;
    default:
      height = "h-14"
    break;
  }
  return (
    <div className="flex justify-center align-middle">
      <img className={`${height}`} src={src} alt={alt} />
    </div>
  )
}
