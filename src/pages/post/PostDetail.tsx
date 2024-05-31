import { useContext, useEffect, useState } from "react"
import { usePostAPI } from "../../adapters/post/post"
import { LinkButton } from "../../components/Link/LinkButton"
import { PageTitle } from "../../components/Title/PageTitle"
import { TitleBox } from "../../components/Title/TitleBox"
import { initPost, Post } from "../../adapters/post/post_schema"
import { StyledLink } from "../../components/Link/StyledLink"
import { useParams } from "react-router-dom"
import { useFileAPI } from "../../adapters/file/file"
import { SimpleButton } from "../../components/Button/SimpleButton"
import { Img } from "../../components/Media/Img"
import { Dl } from "../../components/Dl/Dl"
import { Dt } from "../../components/Dl/Dt"
import { Dd } from "../../components/Dl/Dd"
import { formatDate, isoStringToDate } from "../../utils"
import { Table } from "../../components/Table/Table"
import { Th } from "../../components/Table/Th"
import { Td } from "../../components/Table/Td"
import { FileTypeIcon } from "../../components/Tag/FileTypeIcon"
import { AuthContext } from "../../providers/auth"

export const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<Post>(initPost())
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const { userId } = useContext(AuthContext)
  
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
      <div className="rounded-md py-7 px-10 shadow-md bg-white">
        <Img src={thumbnailUrl} alt={`投稿ID${post.id}のサムネイル画像`} size="m" showBg={true} />
        <Dl>
          <Dt>タイトル</Dt>
          <Dd>{ post.title }</Dd>
        </Dl>
        <Dl>
          <Dt>コメント</Dt>
          <Dd>{ post.comment }</Dd>
        </Dl>
        <Dl>
          <Dt>カテゴリ</Dt>
          <Dd>{ post.category.name }</Dd>
        </Dl>
        <Dl>
          <Dt>投稿者</Dt>
          <Dd>{ post.user.name }さんの投稿</Dd>
        </Dl>
        <Dl>
          <Dt>投稿日時</Dt>
          <Dd>{ formatDate(isoStringToDate(post.created_at)) }</Dd>
        </Dl>
      </div>
      <div className="my-10">
        <Table>
          <thead>
            <tr>
              <Th></Th>
              <Th>ファイル名</Th>
              <Th>ダウンロード</Th>
              { userId == post.user.id && (
                <Th>削除</Th>
              )}
            </tr>
          </thead>
          <tbody>
          { post.files.map((file, index) => (
            <tr>
              <Td>
                { index+1 }
              </Td>
              <Td>
                <FileTypeIcon fileType={file.type} />
                { file.file_name }.{ file.type }
              </Td>
              <Td>
                <SimpleButton type='button' label='download' onClick={() => {onClickDownloadHandler(file.id)}} />
              </Td>
              { userId == post.user.id && (
                <Td>
                  <SimpleButton type='button' label='delete' color="warningRed" onClick={() => {onClickDeleteHandler(file.id)}} />
                </Td>
              ) }
            </tr>
            )) }
          </tbody>
        </Table>
      </div>
      <StyledLink to="/posts" label="一覧ページへ戻る" />
    </>
  )
}
