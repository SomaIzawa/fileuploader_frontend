import { JSXElementConstructor } from 'react';
import { BiSolidFilePng, BiSolidFileJpg, BiSolidError } from 'react-icons/bi';

type Props = {
  fileType: string
}

export const FileTypeIcon = ({
  fileType = ""
}:Props) => {
  const iconCommonClass = "h-7 w-7 text-sky-600 mr-2"
  const outputIcon = () => {
    switch (fileType) {
      case "png" :
        return (
          <BiSolidFilePng className={iconCommonClass} />
        )
      case "jpg" :
      case "jpeg" :
        return (
          <BiSolidFileJpg className={iconCommonClass} />
        )
      default:
        return (
          <BiSolidError className={iconCommonClass} />
        ) 
    }
  }
  return (
    <span>
      { outputIcon() }
    </span>
  )
}
