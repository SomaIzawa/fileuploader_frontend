import { useEffect, useState } from 'react'
import { Category } from '../../adapters/category/category_schema'
import { useCategoryAPI } from '../../adapters/category/category'
import { PageTitle } from '../../components/Title/PageTitle' 
import { LinkButton } from '../../components/Link/LinkButton'
import { Th } from '../../components/Table/Th'
import { Table } from '../../components/Table/Table'
import { Td } from '../../components/Table/Td'

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
  
  return (
    <>
      <div className='w-full flex justify-between place-items-start mb-5'>
        <PageTitle title='Categories' />
        <LinkButton label='Create' to='/categories/new'/>
      </div>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Category Name</Th>
          </tr>
        </thead>
        <tbody>
          { categories.map(category => 
            <tr key={category.name}>
              <Td>{ category.id }</Td>
              <Td>{ category.name }</Td>
            </tr>
          ) }
        </tbody>
      </Table>
    </>
  )
}
