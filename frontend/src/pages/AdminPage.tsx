import React, { useEffect } from "react"
import { usePosts } from "../context/PostsContext";
import SinglePost from "../components/SinglePost";

const AdminPage = () => {
  const { getPosts, posts, deletePost, updatePost } = usePosts();


  // hämtar posts när komponenten laddas in
  useEffect(() => {
    getPosts();
  }, [])

  return (
    <>
      <div>AdminPage</div>
      {
        // Kollar så posts inte är tom
        posts.length > 0 ?
          posts.map((post) => (
            // gjorde article här så key funkar
            <article key={post._id}>
              <SinglePost _id={post._id} title={post.title} author={post.author} content={post.content} date={post.date} />
              <button onClick={() => {
                updatePost(post)
              }}>Edit</button>
              <button onClick={() => {
                deletePost(post)
              }}>Delete</button>
            </article>
          )) : <p>Inga blogginlägg hittades</p>
      }
    </>
  )
}

export default AdminPage