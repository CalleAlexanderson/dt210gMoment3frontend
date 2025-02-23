import { useEffect, useState } from "react"
import { usePosts } from "../context/PostsContext";
import { useLogin } from "../context/LoginContext";
import SinglePost from "../components/SinglePost";
import { Post } from "../types/posts.types";
import { useNavigate } from "react-router-dom";
import './css/BlogpostsPage.css'
import './css/AdminPage.css'

const AdminPage = () => {
  const { getPosts, posts, deletePost, getPost } = usePosts();
      const {logout} = useLogin();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [deleteConfirmDivClass, setdeleteConfirmDivClass] = useState('delete-confirm-div hidden');
  // placeholder Post för useState
  const placeholderPost : Post = {_id: "", title: "", content: "", author: "", date: new Date};
  const [deleteConfirmPost, setdeleteConfirmPost] = useState(placeholderPost);

  const deleteBtnClicked = (dp: Post) => {
    setdeleteConfirmPost(dp);
    setdeleteConfirmDivClass('delete-confirm-div');
  }

  const deleteConfirmed = async (dp: Post) => {
    setError('');
    setdeleteConfirmDivClass('delete-confirm-div hidden');
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
      
      <h1 className="posts-heading">Admin <button className="logout-btn" onClick={logout}>Logga ut</button></h1>
      <button className="admin-add-btn" onClick={() => {
                  navigate(`/admin/add`);
                }}>Skapa inlägg</button>
      {
        error && (
          <div className="error-div">
            <p>{error}</p>
          </div>
        )
      }
      <div className={deleteConfirmDivClass}>
          <p>Vill du verkligen ta bort inlägget "{deleteConfirmPost.title}"?</p>
          <button className="delete-yes" onClick={()=> {
            deleteConfirmed(deleteConfirmPost);
          }}>Ja</button>
          <button className="delete-no"  onClick={() => {
            setdeleteConfirmDivClass('delete-confirm-div hidden');
          }}
          >Nej</button>
      </div>
      <div className="blogposts-display">
        {
          // Kollar så posts inte är tom
          posts.length > 0 ?
            posts.map((post) => (
              // gjorde article här så key funkar
              <article key={post._id}>
                <SinglePost _id={post._id} title={post.title} author={post.author} content={post.content} date={post.date} />

                <button className="admin-btn edit" onClick={async () => {
                  await getPost(post._id);
                  navigate(`/admin/edit/:${post._id}`);
                }}>Redigera</button>

                <button className="admin-btn del" onClick={() => {
                  deleteBtnClicked(post)
                }}>Ta bort</button>
              </article>
            )) : <p>Inga blogginlägg hittades</p>
        }
      </div>
    </>
  )
}

export default AdminPage