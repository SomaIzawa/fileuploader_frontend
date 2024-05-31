import { useNavigate } from "react-router-dom"
import { PageTitle } from "../../components/Title/PageTitle"
import { TitleBox } from "../../components/Title/TitleBox"
import { FormLabel } from "../../components/Form/FormLabel"
import { FormInput } from "../../components/Form/FormInput"
import { SimpleButton } from "../../components/Button/SimpleButton"
import { StyledLink } from "../../components/Link/StyledLink"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Form } from "../../components/Form/Form" 
import { FormSelect } from "../../components/Form/FormSelect"
import { useCategoryAPI } from "../../adapters/category/category"
import { Category } from "../../adapters/category/category_schema"
import { FormFile } from "../../components/Form/FormFile"
import { usePostAPI } from "../../adapters/post/post"

export const PostCreate = () => {
  const navigate = useNavigate();

  // api event
  const [categories, setCategories] = useState<Category[]>([])
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await useCategoryAPI.list()
        setCategories(res)
      } catch(err) {
        console.log(err)
      }
    }
    getCategories();
  }, [])

  // form values
  const [title, setTitle] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [fileNames, setFileNames] = useState<string[]>([""]);
  const [files, setFiles] = useState<(File | null)[]>([null]);

  // form event
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    }
  };
  const addForm = () => {
    const newFileNames= [...fileNames]
    newFileNames.push("")
    setFileNames(newFileNames)
    const newFiles = [...files]
    newFiles.push(null)
    setFiles(newFiles)
  }
  const handleFileNameChange = (index: number, value: string) => {
    const newFileNames = [...fileNames]
    newFileNames[index] = value;
    setFileNames(newFileNames)
  };
  const handleFileChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFiles = [...files]
      newFiles[index] = e.target.files[0]
      setFiles(newFiles)
    }
  }
  const submitCreatePostHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("title: ", title)
    console.log("comment: ", comment)
    console.log("category_id: ", categoryId)
    console.log("thumbnail: ", thumbnail)
    console.log("filenames: ", fileNames)
    console.log("files: ", files)

    const formData = new FormData();
    formData.append('title', title);
    formData.append('comment', comment);
    formData.append('category_id', categoryId);
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }
    files.forEach((file) => {
      formData.append(`files`, file != null ? file : "");
    });
    fileNames.forEach((filename) => {
      formData.append(`filenames`, filename);
    });

    await usePostAPI.create(formData)
    navigate("/posts")
  }

  return (
    <>
      <TitleBox>
        <PageTitle title="Create Categorie" />
      </TitleBox>
      <div className="">
        <Form onSubmit={submitCreatePostHandler}>
          <FormLabel labelId="title" label="title" />
          <FormInput
            id="title"
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <FormLabel labelId="comment" label="comment" />
          <FormInput
            id="comment"
            placeholder="comment"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <FormLabel labelId="category" label="category" />
          <FormSelect
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">please select</option>
            { categories.map((category) => 
              <option key={ category.name } value={ category.id }>{ category.name }</option>
            ) }
          </FormSelect>
          <FormLabel labelId="thumbnail" label="thumbnail" />
          <FormFile id="thumbnail" onChange={handleThumbnailChange} />
          <FormLabel labelId="files" label="files" />
          <div className="mb-5">
            { fileNames.map((fileName, index) => (
              <div key={index}>
                <FormLabel labelId={`filename${index+1}`} label={`filename${index+1}`} />
                <FormInput
                  id={`filename${index+1}`}
                  placeholder={`filename${index+1}`}
                  onChange={(e) => handleFileNameChange(index, e.target.value)}
                  value={fileName}
                />
                <FormFile id={`file${index+1}`} onChange={(e) => {handleFileChange(index, e)}} />
              </div>
            )) }
            <SimpleButton type="button" label="add" onClick={addForm} />
          </div>
          <div>
            <SimpleButton type="submit" label="Create" />
          </div>
        </Form>
        <p>
          <StyledLink label="Back" to="/posts" />
        </p>
      </div>
    </>
  )
}
