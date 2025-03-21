import React from 'react'
import { useState } from "react";
import { usePosts } from "../context/PostsContext";
import { useNavigate } from "react-router-dom";
import './css/EditPostPage.css'
import { APost } from '../types/posts.types';

const AddPostPage = () => {

    const { addPost } = usePosts();
    const navigate = useNavigate();

    const [createForm, setCreateForm] = useState<APost>({
        title: "",
        content: "",
    });

    const [errors, setErrors] = useState<APost>({});

    // validerar formuläret
    const validateForm = (data: APost) => {
        const validationErrors: APost = {};

        if (!data.title) {
            validationErrors.title = "Fyll i titel"
        } else {
            if (data.title.length < 3) {
                validationErrors.title = "Titeln måste vara minst 3 tecken"
            }
        }

        if (!data.content) {
            validationErrors.content = "Fyll i innehåll"
        } else {
            if (data.content.length < 50) {
                validationErrors.content = "Blogginläggets innehåll måste minst vara 50 tecken långt"
            }
        }

        return validationErrors;
    }

    // anropar login från LoginContext
    const AddPostFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors = validateForm(createForm);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            updateDb();
        }

    }

    const updateDb = async () => {

        try {
            let newPost = {
                title: createForm.title,
                content: createForm.content
            }
            await addPost(newPost);
            setCreateForm({
                title: "",
                content: "",
            });
            navigate("/admin")
        } catch (error) {
            setCreateForm({
                title: "",
                content: "",
            });
        }
    };


    return (
        <>
            <form className="admin-form" onSubmit={AddPostFormSubmit}>
                <p role="link" className="return-blog" onClick={() => {
                    navigate('/admin');
                }}>➦</p>
                <div>
                    <label htmlFor="title">Titel</label>
                    <input type="text" id="title" required autoComplete="off" value={createForm.title} onChange={(event) => { setCreateForm({ ...createForm, title: event.target.value }); }} />
                    {errors.title && <span className="form-error">{errors.title}</span>}
                </div>
                <div>
                    <label htmlFor="content">Innehåll</label>
                    <textarea id="content" value={createForm.content} onChange={(event) => { setCreateForm({ ...createForm, content: event.target.value }); }}></textarea>
                    {errors.content && <span className="form-error">{errors.content}</span>}
                </div>
                <input type="submit" value="Skapa" />
            </form>
        </>
    )
}

export default AddPostPage