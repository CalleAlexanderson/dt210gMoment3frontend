import React, { useEffect, useState } from "react"
import { usePosts } from "../context/PostsContext";
import SinglePost from "../components/SinglePost";
import { Post } from "../types/posts.types";
import { useNavigate } from "react-router-dom";
import './css/BlogpostsPage.css'

const AdminPage = () => {
  const { getPosts, posts, deletePost, getPost } = usePosts();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const deleteBtnClicked = async (dp: Post) => {
    setError('');
    try {
      await deletePost(dp)
    } catch (error) {
      setError("Du har inte befogenhet att ta bort blogginlägg")
    }
  }


  // hämtar posts när komponenten laddas in
  useEffect(() => {
    getPosts();
  }, [])

  return (
    <>
      <h1 className="posts-heading">Admin</h1>
      {
        error && (
          <div className="error-div">
            <p>{error}</p>
          </div>
        )
      }
      <div className="blogposts-display">
        {
          // Kollar så posts inte är tom
          posts.length > 0 ?
            posts.map((post) => (
              // gjorde article här så key funkar
              <article key={post._id}>
                <SinglePost _id={post._id} title={post.title} author={post.author} content={post.content} date={post.date} />

                <button onClick={async () => {
                  await getPost(post);
                  navigate(`/edit/:${post._id}`);
                }}>Edit</button>

                <button onClick={() => {
                  deleteBtnClicked(post)
                }}>Delete</button>
              </article>
            )) : <p>Inga blogginlägg hittades</p>
        }
      </div>
    </>
  )
}

export default AdminPage