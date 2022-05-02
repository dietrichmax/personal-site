import PostPreview from 'src/components/article/article-preview/article-preview'

export default function RecommendedPosts({ post, allPosts }) {

    // filter out current post
    let posts = allPosts.filter((aPost) => aPost.slug !==post.slug);
    
    // define maxPosts to display
    const maxPosts = 3

    // get tags of current posts
    const tags = post.tags.map((tag) => {
        return tag.name
    })

    // rate posts depending on tags
    posts.forEach((post) => {
        post.value = 0
        post.tags.forEach((tag) => {
            if (tags.includes(tag.name)) {
                post.value ++
            }
        })
    })

    // sort posts by value
    const sortedPosts = posts.sort(function(a, b) {
        return b.value - a.value;
    });

    return (
        <>
          {sortedPosts.slice(0,maxPosts).map((post,i) => (
            <PostPreview
              key={i} 
              postData={post}
            />
          ))}
        </>
    )
  }

  