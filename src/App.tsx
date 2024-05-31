import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Sample } from './pages/Sample';
import axios from 'axios';
import { CsrfToken } from './types';
import { SignUp } from './pages/SignUp';
import { Login } from './pages/Login';
import { ProtectedPage } from './pages/ProtectedPage';
import { AuthProvider } from './providers/auth';
import MainLayout from './pages/layout/mainLayout';
import { PostList } from './pages/post/PostList';
import { CategoryList } from './pages/category/CategoryList';
import { CategoryCreate } from './pages/category/CategoryCreate';
import { PostCreate } from './pages/post/PostCreate';
import { PostDetail } from './pages/post/PostDetail';

function App() {
  useEffect(() => {
    axios.defaults.withCredentials = true
    const getCsrfToken = async () => {
      const { data } = await axios.get<CsrfToken>(
        `${process.env.REACT_APP_API_URL}/csrf`
      )
      axios.defaults.headers.common['X-CSRF-Token'] = data.csrf_token
    }
    getCsrfToken()
  }, [])
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Sample />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route element={<ProtectedPage />}>
            <Route element={<MainLayout />}>
              <Route path='/posts' >
                <Route path='' element={ <PostList /> } />
                <Route path=':postId' element={ <PostDetail /> } />
                <Route path='new' element={ <PostCreate /> } />
              </Route>
              <Route path='/categories'>
                <Route path='' element={ <CategoryList /> } />
                <Route path='new' element={ <CategoryCreate /> } />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
