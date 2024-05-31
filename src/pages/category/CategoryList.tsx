import { useEffect, useState } from 'react'
import { Category } from '../../adapters/category/category_schema'
import { useCategoryAPI } from '../../adapters/category/category'
import { AuthContext } from '../../providers/auth'
import { PageTitle } from '../../components/Title/PageTitle' 
import { LinkButton } from '../../components/Link/LinkButton'

export const CategoryList = () => {
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

  const onClickHandler = async () => {
    try {
      const res = await useCategoryAPI.list()
      setCategories(res)
    } catch(err) {
      console.log(err)
    }
  }
  
  
  return (
    <>
      <div className='w-full flex justify-between place-items-start mb-5'>
        <PageTitle title='Categories' />
        <LinkButton label='Create' to='/categories/new'/>
      </div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
          </tr>
        </thead>
        <tbody>
          { categories.map(category => 
            <tr key={category.name}>
              <td>{ category.id }</td>
              <td>{ category.name }</td>
            </tr>
          ) }
        </tbody>
      </table>
    </>
  )
}
