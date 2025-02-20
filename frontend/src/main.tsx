import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './routing.tsx'
import { LoginProvider } from './context/LoginContext.tsx'
import { PostsProvider } from './context/PostsContext.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoginProvider>
      <PostsProvider>
        <RouterProvider router={router} />
      </PostsProvider>
    </LoginProvider>
  </StrictMode>,
)
