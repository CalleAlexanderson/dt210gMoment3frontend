import { Post } from "../types/posts.types"
import { usePosts } from "../context/PostsContext";
import { useNavigate } from "react-router-dom";

const SinglePost = (props: Post) => {
  const { getPost } = usePosts();
  const navigate = useNavigate();
  return (
    <>
      <p>{props.title}</p><p>{props._id}</p>
      <p onClick={() => {
        getPost(props);
        navigate(`/post/:${props._id}`);
      }}>Läs mer</p>
    </>
  )
}

export default SinglePost