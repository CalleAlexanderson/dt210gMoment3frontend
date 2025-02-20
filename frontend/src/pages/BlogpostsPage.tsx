import React, { useEffect } from "react"
import { usePosts } from "../context/PostsContext";
import SinglePost from "../components/SinglePost";

const BlogpostsPage = () => {
  const { getPosts, posts } = usePosts();


  // hämtar posts när komponenten laddas in
  useEffect(() => {
    getPosts();
  }, [])

  return (
    <>
      <div>BlogpostsPage</div>
      {
        // Kollar så posts inte är tom
        posts.length > 0 ?
          posts.map((post) => (
            // gjorde article här så key funkar
            <article key={post._id}>
              <SinglePost _id={post._id} title={post.title} author={post.author} content={post.content} date={post.date} />
            </article>
          )) : <p>Inga blogginlägg hittades</p>
      }</>

  )
}

export default BlogpostsPage