import PostTitle from '@/components/title/post-title'
import styled from 'styled-components';
import PostMeta from "@/components/post/post-meta/post-meta"
import PostTags from "@/components/tags/tags"

const PostHeaderWrapper = styled.div`
`

const PostTitleWrapper = styled.div`
  max-width: 800px;
`



export default function PostHeader({ postData, slug}) {

  const { title, tags } = postData

  return (
    <>
      <PostHeaderWrapper>
        
        {/*<PostTitleWrapper>  
          <PostTitle className="p-name">{title}</PostTitle>   
        </PostTitleWrapper> */}

          
          <PostMeta postMetaData={postData} />
         
          <PostTags tags={tags}/>
          
      </PostHeaderWrapper>
    </>
  )
}
