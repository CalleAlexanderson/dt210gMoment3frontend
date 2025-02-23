import { createContext, useState, useContext, ReactNode } from "react";
import { PostsContextType, Post, UPost, APost } from "../types/posts.types";
import { useLogin } from "./LoginContext";


const PostsContext = createContext<PostsContextType | null>(null);

interface PostsProviderProps {
    children: ReactNode
}

export const PostsProvider: React.FC<PostsProviderProps> = ({ children }) => {


    const [posts, setPosts] = useState<Post[]>([]);
    const [singlePost, setSinglePost] = useState<Post | null>(null);
    const {user} = useLogin();

    // hämtar poster
    const getPosts = async () => {

        try {
            const response = await fetch("http://127.0.0.1:3000/posts")

            if (!response.ok) {
                throw new Error;
            }

            const data = await response.json() as Post[];

            setPosts(data);
        } catch (error) {
            throw error;
        }
    }

    // hämtar enskild post
    const getPost = async (id: string) => {
        try {
            const response = await fetch(`http://127.0.0.1:3000/post/${id}`)

            if (!response.ok) {
                throw new Error;
            }

            const data = await response.json() as Post;
            console.log(data);

            setSinglePost(data);
        } catch (error) {
            throw error;
        }
    }

    // uppdatera en post, inte påbörjad
    const addPost = async (aPost: APost) => {
        let key: string = "Bearer " + localStorage.getItem('jwt')
        try {
            const response = await fetch(`http://127.0.0.1:3000/add/post`, {
                method: "POST",
                headers: {
                    'authorization': key
                },
                body: JSON.stringify({ 
                    title: aPost.title,
                    author: user?.username,
                    content: aPost.content,
                })
            })

            if (!response.ok) {
                throw new Error;
            }

            const data = await response.json() as any;
            console.log(data);
        } catch (error) {
            throw error;
        }
    }

    // uppdatera en post, inte påbörjad
    const updatePost = async (uPost: UPost) => {
        let key: string = "Bearer " + localStorage.getItem('jwt')
        try {
            const response = await fetch(`http://127.0.0.1:3000/update/${uPost._id}`, {
                method: "PUT",
                headers: {
                    'authorization': key
                },
                body: JSON.stringify({ 
                    title: uPost.title,
                    content: uPost.content,
                })
            })

            if (!response.ok) {
                throw new Error;
            }

            const data = await response.json() as any;
            console.log(data);


            getPosts();
        } catch (error) {
            throw error;
        }
    }

    // ta bort en post
    const deletePost = async (dPost: Post) => {
        let key: string = "Bearer " + localStorage.getItem('jwt')
        try {
            const response = await fetch(`http://127.0.0.1:3000/delete/${dPost._id}`, {
                method: "DELETE",
                headers: {
                    'authorization': key
                },
                body: JSON.stringify({ role: user?.role})
            })

            if (!response.ok) {
                throw new Error;
            }
            const data = await response.json() as any;

            if (!data.deleted) {
                throw new Error
            }
            getPosts();
        } catch (error) {
            throw error;
        }
    }

    return (
        <PostsContext.Provider value={{ getPosts, getPost, addPost, updatePost, deletePost, posts, singlePost }}>
            {
                children
            }
        </PostsContext.Provider>
    )
}

// låter andra filer använda PostsContext
export const usePosts = (): PostsContextType => {
    const context = useContext(PostsContext);

    if (!context) {
        throw new Error("usePosts måste har PostsProvider");
    }

    return context;
}