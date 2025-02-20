import { useState } from "react";
import { usePosts } from "../context/PostsContext";
import { useNavigate, useParams } from "react-router-dom";

const EditPostPage = () => {
    const { singlePost, updatePost } = usePosts();
    const [title, setTitle] = useState(singlePost?.title);
    const [content, setContnent] = useState(singlePost?.content);
    const navigate = useNavigate();
    const { id } = useParams()

    // anropar login från LoginContext
        const EditPostFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            try {
                let newPost = {
                    _id: id,
                    title: title,
                    content: content
                }
                await updatePost(newPost);
                navigate("/admin")
            } catch (error) {
                setTitle('');
                setContnent('');
            }
        }


  return (
    <>
        <form onSubmit={EditPostFormSubmit}>
            <div>
                <label htmlFor="title"></label>
                <input type="text" id="title" required autoComplete="off" value={title} onChange={(event) => setTitle(event.target.value)} />
            </div>
            <div>
                <label htmlFor="content"></label>
                <textarea id="content" value={content} onChange={(event) => setContnent(event.target.value)}></textarea>
            </div>
            <input type="submit" value="Spara" />
        </form>
    </>
  )
}

export default EditPostPage