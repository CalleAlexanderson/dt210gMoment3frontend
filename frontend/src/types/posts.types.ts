// blogginlägg
export interface Post {
    _id: string,
    title: string,
    author: string,
    content: string,
    date: Date
}

// uppdatera blogginlägg
export interface UPost {
    _id?: string,
    title?: string,
    content?: string
}

// används för att skapa PostsContext
export interface PostsContextType {
    posts: Post[],
    singlePost: Post | null,
    getPosts: () => Promise<void>; // Post[]
    getPost: (sPost: Post) => Promise<void>;
    updatePost: (uPost: UPost) => Promise<void>;
    deletePost: (dPost: Post) => Promise<void>;
}