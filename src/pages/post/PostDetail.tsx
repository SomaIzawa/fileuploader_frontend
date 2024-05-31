import { useEffect, useState } from "react"
import { usePostAPI } from "../../adapters/post/post"
import { LinkButton } from "../../components/Link/LinkButton"
import { PageTitle } from "../../components/Title/PageTitle"
import { TitleBox } from "../../components/Title/TitleBox"
import { initPost, Post } from "../../adapters/post/post_schema"
import { StyledLink } from "../../components/Link/StyledLink"
import { useParams } from "react-router-dom"
import { useFileAPI } from "../../adapters/file/file"
import { SimpleButton } from "../../components/Button/SimpleButton"

export const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<Post>(initPost())
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");

  // 
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await usePostAPI.getById(Number(postId))
        const signedThumbnailURL = await useFileAPI.getSignedUrl({
          url: `https://d1voeshnxmc2l3.cloudfront.net/t${res.id}.${res.thumbnail_type}`
        })
        setPost(res)
        setThumbnailUrl(signedThumbnailURL)
      } catch(err) {
        console.log(err)
      }
    }
    getPosts();
  }, [])
  const onClickDownloadHandler = async (id: number) => {
    try {
      const res = await useFileAPI.getDownloadUrl(id)
      const downloadRes = await fetch(res.download_link)
      if(!downloadRes.ok){
        return
      }
      const blob = await downloadRes.blob();
  
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = res.file_name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to initiate download:", error)
    }
  }
  const onClickDeleteHandler = async (id: number) => {
    try {
      await useFileAPI.delete(id)
      const res = await usePostAPI.getById(Number(postId))
      const signedThumbnailURL = await useFileAPI.getSignedUrl({
        url: `https://d1voeshnxmc2l3.cloudfront.net/t${res.id}.${res.thumbnail_type}`
      })
      setPost(res)
      setThumbnailUrl(signedThumbnailURL)
    } catch (error) {
      console.error("Failed to initiate delete:", error)
    }
  }
  return (
    <>
      <TitleBox>
        <PageTitle title="Post Detail" />
      </TitleBox>
      <div>
        <div>
          <img src={thumbnailUrl} alt={`投稿ID${post.id}のサムネイル画像`} />
        </div>
        <dl>
          <dt>タイトル</dt>
          <dd>{ post.title }</dd>
        </dl>
        <dl>
          <dt>コメント</dt>
          <dd>{ post.comment }</dd>
        </dl>
        <dl>
          <dt>カテゴリ</dt>
          <dd>{ post.category.name }</dd>
        </dl>
        <dl>
          <dt>投稿者</dt>
          <dd>{ post.user.name }さんの投稿</dd>
        </dl>
        <dl>
          <dt>投稿日時</dt>
          <dd>{ post.created_at.toLocaleString() }</dd>
        </dl>
      </div>
      <div className="my-10">
        <table>
          <thead>
            <tr>
              <th>ファイル名</th>
              <th>ダウンロード</th>
              <th>削除</th>
            </tr>
          </thead>
          <tbody>
          { post.files.map((file) => (
            <tr>
              <td>
                { file.file_name }.{ file.type }
              </td>
              <td>
                <SimpleButton type='button' label='download' onClick={() => {onClickDownloadHandler(file.id)}} />
              </td>
              <td>
                <SimpleButton type='button' label='delete' color="warningRed" onClick={() => {onClickDeleteHandler(file.id)}} />
              </td>
            </tr>
            )) }
          </tbody>
        </table>
      </div>
      <StyledLink to="/posts" label="一覧ページへ戻る" />
    </>
  )
}
