// blogginlägg
export interface Post {
    _id: string,
    title: string,
    author: string,
    content: string,
    date: Date
}

// används för att skapa PostsContext
export interface PostsContextType {
    posts: Post[],
    singlePost: Post | null,
    getPosts: () => Promise<void>; // Post[]
    getPost: (sPost: Post) => Promise<void>;
    updatePost: (newPost: Post) => Promise<void>;
    deletePost: () => Promise<void>;
}