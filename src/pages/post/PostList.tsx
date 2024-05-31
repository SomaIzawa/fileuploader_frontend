import { useEffect, useState } from "react"
import { usePostAPI } from "../../adapters/post/post"
import { LinkButton } from "../../components/Link/LinkButton"
import { PageTitle } from "../../components/Title/PageTitle"
import { TitleBox } from "../../components/Title/TitleBox"
import { Post } from "../../adapters/post/post_schema"
import { StyledLink } from "../../components/Link/StyledLink"
import { useFileAPI } from "../../adapters/file/file"

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
      <table>
        <thead>
          <tr>
            <th>サムネイル</th>
            <th>投稿日時</th>
            <th>タイトル</th>
            <th>投稿者</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          { posts.map((post) => (
            <tr key={post.id}>
              <td><img 
              className="h-40" 
              src={post.signed_url} 
              alt={`投稿ID${post.id}のサムネイル画像`} /></td>
              <td>{ post.created_at.toLocaleString() }</td>
              <td>{ `【${post.category.name}】${post.title}` }</td>
              <td>{ post.user.name }</td>
              <td>
                <StyledLink to={`/posts/${post.id}`} label="詳細ページへ" />
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    </>
  )
}
