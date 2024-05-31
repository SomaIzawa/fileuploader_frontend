export type Color = "primary" | "warningRed"
export type ColorSet = {
  bg: string
  color: string
}
export const getColorSet = (color :Color) :ColorSet => {
  switch (color) {
    case "primary":
      return {
        bg: "bg-sky-500",
        color: "text-white",
      }
    case "warningRed":
      return {
        bg: "bg-red-600",
        color: "text-white",
      }
    default:
      return {
        bg: "bg-sky-500",
        color: "text-white",
      }
  }
}