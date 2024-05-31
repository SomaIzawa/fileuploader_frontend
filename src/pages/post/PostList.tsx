import { useEffect, useState } from "react"
import { usePostAPI } from "../../adapters/post/post"
import { LinkButton } from "../../components/Link/LinkButton"
import { PageTitle } from "../../components/Title/PageTitle"
import { TitleBox } from "../../components/Title/TitleBox"
import { Post } from "../../adapters/post/post_schema"
import { StyledLink } from "../../components/Link/StyledLink"
import { useFileAPI } from "../../adapters/file/file"
import { Table } from "../../components/Table/Table"
import { Th } from "../../components/Table/Th"
import { Td } from "../../components/Table/Td"
import { IconImg } from "../../components/Media/IconImg"
import { formatDate, isoStringToDate } from "../../utils"
import { NomalTag } from "../../components/Tag/NomalTag"

export const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await usePostAPI.list()
        const postsWithModified = await Promise.all(res.map(async (item) => {
          const signedUrl = await useFileAPI.getSignedUrl({
            url: `https://d1voeshnxmc2l3.cloudfront.net/t${item.id}.${item.thumbnail_type}`
          })
          return {
            ...item,
            signed_url: signedUrl
          };
        }))
        setPosts(postsWithModified)
        console.log(postsWithModified)
      } catch(err) {
        console.log(err)
      }
    }
    getPosts();
  }, [])
  return (
    <>
      <TitleBox>
        <PageTitle title="Post List" />
        <LinkButton label='Create' to='/posts/new'/>
      </TitleBox>
      <Table>
        <thead>
          <tr>
            <Th>サムネイル</Th>
            <Th>投稿日時</Th>
            <Th>タイトル</Th>
            <Th>投稿者</Th>
            <Th>操作</Th>
          </tr>
        </thead>
        <tbody>
          { posts.map((post) => (
            <tr key={post.id}>
              <Td>
                <IconImg
                size="l"
                src={post.signed_url} 
                alt={`投稿ID${post.id}のサムネイル画像`} />
              </Td>
              <Td>{ formatDate(isoStringToDate(post.created_at)) }</Td>
              <Td>
                <NomalTag label={post.category.name} />
                <span className="items-center ">
                  { post.title }
                </span>
              </Td>
              <Td>{ post.user.name }</Td>
              <Td>
                <LinkButton to={`/posts/${post.id}`} label="詳細ページへ" />
              </Td>
            </tr>
          )) }
        </tbody>
      </Table>
    </>
  )
}
