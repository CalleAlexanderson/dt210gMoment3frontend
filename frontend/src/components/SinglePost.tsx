import { Post } from "../types/posts.types"

const SinglePost = (props: Post) => {
  return (
    <>
      <p>{props.title}</p><p>{props._id}</p>
    </>
  )
}

export default SinglePost