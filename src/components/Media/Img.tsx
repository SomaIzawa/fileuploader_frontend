type Props = {
  src: string
  alt: string
  size?: "l" | "m" | "s"
  showBg?: boolean
}

export const Img = ({
  src="",
  alt="",
  size="m",
  showBg=false
}:Props) => {
  let height = ""
  switch (size) {
    case "l":
      height = "h-60"
    break;
    case "m":
      height = "h-40"
    break;
    case "s":
      height = "h-20"
    break;
    default:
      height = "h-40"
    break;
  }
  return (
    <div className={`align-middle w-full flex justify-center py-4 my-2 ${ showBg && "bg-slate-200" }`}>
      <img className={`${height}`} src={src} alt={alt} />
    </div>
  )
}
