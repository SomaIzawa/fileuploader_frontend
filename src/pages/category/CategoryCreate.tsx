import { FormEvent, useState } from 'react'
import { useCategoryAPI } from '../../adapters/category/category'
import { useNavigate } from 'react-router-dom'
import { PageTitle } from '../../components/Title/PageTitle'
import { TitleBox } from '../../components/Title/TitleBox'
import { Form } from '../../components/Form/Form'
import { FormLabel } from '../../components/Form/FormLabel'
import { FormInput } from '../../components/Form/FormInput'
import { SimpleButton } from '../../components/Button/SimpleButton'
import { StyledLink } from '../../components/Link/StyledLink'

export const CategoryCreate = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const submitCreateCategoryHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await useCategoryAPI.create({
      name: name
    })
    navigate("/categories")
  }
  
  
  return (
    <>
      <TitleBox>
        <PageTitle title='Create Categorie' />
      </TitleBox>
      <div>
      <Form onSubmit={submitCreateCategoryHandler}>
        <dl>
          <FormLabel labelId='name' label='category name'/>
          <FormInput 
            id="name"
            placeholder="category name" 
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </dl>
        <div>
          <SimpleButton type='submit' label='Create' />
        </div>
      </Form>
      <p><StyledLink label='Back' to='/categories' /></p>
    </div>
    </>
  )
}
