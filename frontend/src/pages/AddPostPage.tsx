import React from 'react'
import { useState } from "react";
import { usePosts } from "../context/PostsContext";
import { useNavigate } from "react-router-dom";
import './css/EditPostPage.css'

const AddPostPage = () => {

    const { addPost } = usePosts();
    const [titleCreate, setTitleCreate] = useState('');
    const [contentCreate, setContnentCreate] = useState('');
    const navigate = useNavigate();



    // anropar login från LoginContext
    const AddPostFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            let newPost = {
                title: titleCreate,
                content: contentCreate
            }
            await addPost(newPost);
            setTitleCreate('');
            setContnentCreate('');
            navigate("/admin")
        } catch (error) {
            setTitleCreate('');
            setContnentCreate('');
        }
    }


    return (
        <>
            <form className="admin-form" onSubmit={AddPostFormSubmit}>
                <p role="link" className="return-blog" onClick={() => {
                    navigate('/admin');
                }}>➦</p>
                <div>
                    <label htmlFor="title">Titel</label>
                    <input type="text" id="title" required autoComplete="off" value={titleCreate} onChange={(event) => setTitleCreate(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="content">Innehåll</label>
                    <textarea id="content" value={contentCreate} onChange={(event) => setContnentCreate(event.target.value)}></textarea>
                </div>
                <input type="submit" value="Skapa" />
            </form>
        </>
    )
}

export default AddPostPage