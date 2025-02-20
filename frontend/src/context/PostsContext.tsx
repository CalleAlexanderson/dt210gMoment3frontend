import { createContext, useState, useContext, ReactNode } from "react";
import { PostsContextType, Post } from "../types/posts.types";

const PostsContext = createContext<PostsContextType | null>(null);

interface PostsProviderProps {
    children: ReactNode
}

export const PostsProvider: React.FC<PostsProviderProps> = ({ children }) => {
    

    const [posts, setPosts] = useState<Post[]>([]);
    const [singlePost, setSinglePost] = useState<Post | null>(null);
    
        // hämtar poster
        const getPosts = async () => {
            
            try {
                const response = await fetch("http://127.0.0.1:3000/posts")
                
                if (!response.ok) {
                    throw new Error;
                }
                
                const data = await response.json() as Post[];

                console.log(data);
                for (let index = 0; index < data.length; index++) {
                    console.log(data[index]._id);
                }
                
                
                
                setPosts(data);
            } catch (error) {
                throw error;
            }
        }

        // hämtar enskild post
        const getPost = async (sPost: Post) => {
            try {
                const response = await fetch(`http://127.0.0.1:3000/post/${sPost._id}`)
                
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
        const updatePost = async (newPost: Post) => {
            console.log(newPost);
            
            try {
                const response = await fetch("http://127.0.0.1:3000/posts")
                
                if (!response.ok) {
                    throw new Error;
                }
                
                const data = await response.json() as Post;
                console.log(data);
                
                
                
                // setPosts(data);
            } catch (error) {
                throw error;
            }
        }
        
        // ta bort en post, inte påbörjad
        const deletePost = async () => {
            
            try {
                const response = await fetch("http://127.0.0.1:3000/posts")
                
                if (!response.ok) {
                    throw new Error;
                }
                
                const data = await response.json() as Post;
                console.log(data);
                
                
                
                // setPosts(data);
            } catch (error) {
                throw error;
            }
        }

    return (
        <PostsContext.Provider value={{ getPosts, getPost, updatePost, deletePost, posts, singlePost }}>
            {
                children
            }
        </PostsContext.Provider>
    )
}

// låter andra filer använda PostsContext
export const usePosts = () : PostsContextType =>{
    const context = useContext(PostsContext);

    if (!context) {
        throw new Error("usePosts måste har PostsProvider");
    }

    return context;
}