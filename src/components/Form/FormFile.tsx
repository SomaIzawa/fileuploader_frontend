import React, { ChangeEvent, ReactNode, useState } from 'react'

type Props = {
  id: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const FormFile = ({ 
  id = "", 
  onChange 
}: Props) => {

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if(files && files.length > 0){
      const fileName = files[0].name
      setFileName(fileName)
    }
    onChange(e)
  }

  const [fileName, setFileName] = useState<string>("ファイルが選択されていません")

  return (
    <div className="mt-3 mb-5">
      <input
        type="file"
        id={id}
        onChange={handleOnChange}
        className="hidden"
      />
      <div>
        <label
          htmlFor={id}
          className="cursor-pointer bg-sky-500 py-2 px-5 text-white rounded-md"
        >
          ファイルを選択
        </label>
        <span className='pl-3'>
          { fileName }
        </span>
      </div>
    </div>
  )
}
