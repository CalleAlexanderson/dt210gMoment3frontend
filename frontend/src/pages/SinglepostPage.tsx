import { usePosts } from "../context/PostsContext";
import { useNavigate, useParams } from "react-router-dom";
import './css/SinglepostPage.css'
import { useEffect } from "react";

const SinglepostPage = () => {
  const { singlePost, getPost } = usePosts();
  const date: string | undefined = singlePost?.date.toString().substring(0, 10)
  const navigate = useNavigate();


  // laddar in post
  const params = useParams();
  let postId = params.id;
  postId = postId?.substring(1, postId.length)
  useEffect(() => {
    if (postId) {
      getPost(postId)
    }
  }, [])

  return (
    <article className="singlepost-article">
      <p role="link" className="return-blog" onClick={() => {
        navigate('/posts');
      }}>➦</p>
      <h1 className="singlepost-heading">{singlePost?.title}</h1>
      <div className="author-date single-a-d">
        <p>{singlePost?.author}</p>
        <p>{date}</p>
      </div>
      <p className="singlepost-content">{singlePost?.content}</p>
    </article>

  )
}

export default SinglepostPage