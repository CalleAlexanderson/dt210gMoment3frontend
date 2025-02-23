import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import BlogpostsPage from "./pages/BlogpostsPage";
import LoginPage from "./pages/LoginPage";
import SinglepostPage from "./pages/SinglepostPage";
import AdminPage from "./pages/AdminPage";
import EditPostPage from "./pages/EditPostPage";
import AddPostPage from "./pages/AddPostPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/posts",
                element: <BlogpostsPage />
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/post/:id",
                element: <SinglepostPage />
            },
            {
                path: "/admin",
                element: (
                    <ProtectedRoute>
                        <AdminPage />
                    </ProtectedRoute>

                )
            },
            {
                path: "/admin/edit/:id",
                element: (
                    <ProtectedRoute>
                        <EditPostPage />
                    </ProtectedRoute>

                )
            },
            {
                path: "/admin/add",
                element: (
                    <ProtectedRoute>
                        <AddPostPage />
                    </ProtectedRoute>

                )
            }
        ]
    }

])

export default router;