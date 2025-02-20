import { usePosts } from "../context/PostsContext";

const SinglepostPage = () => {
  const { singlePost } = usePosts();
  return (
    <>
      <p>{singlePost?.content}</p>
    </>
  )
}

export default SinglepostPage