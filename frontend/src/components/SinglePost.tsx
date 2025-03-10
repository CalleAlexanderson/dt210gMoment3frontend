import { Post } from "../types/posts.types"
import './css/SinglePost.css'

const SinglePost = (props: Post) => {
  const date: string = props.date.toString().substring(0, 10)
  let postDesc: string = props.content.substring(0, Math.min(props.content.length, 200))

  if (postDesc.length == 200) {

    postDesc = postDesc + " ...";
  }
  return (
    <>
      <div className="article-div">
        <h3 className="post-heading">{props.title}</h3>
        <div className="author-date">
          <p className="post-author">{props.author}</p>
          <p className="post-date">{date}</p>
        </div>
        <p className="post-desc">{postDesc}</p>
      </div>
    </>
  )
}

export default SinglePost