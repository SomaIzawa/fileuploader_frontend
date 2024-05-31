import React, { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useUserAPI } from '../../adapters/user/user'
import { StyledLink } from '../../components/Link/StyledLink';
import { AuthContext } from '../../providers/auth';

export default function MainLayout() {
  const navigate = useNavigate();
  const { ReloadAuth, userName, userId } = useContext(AuthContext)
  const logoutButtonHandler = () => {
    useUserAPI.logout();
    ReloadAuth();
    navigate("/login")
  }
  return (
    <div className='flex flex-col min-h-screen'>
      <header className='text-white bg-slate-600 py-5 px-10 flex justify-between'>
        <div>
          <h1>FileUploader</h1>
        </div>
        <div className='flex'>
          <div className='mr-5'>
            <StyledLink to='/categories' label='Category' />
          </div>
          <div className='mr-5'>
            <StyledLink to='/posts' label='Post' />
          </div>
          <div className='mr-5'>
            { userId != -1 && `ようこそ、${userName}さん` }
          </div>
          <button onClick={logoutButtonHandler}>ログアウト</button>    
        </div>
      </header>
      <main className='py-5 px-10 flex-grow bg-gray-100'>
        <Outlet />
      </main>
      <footer className='py-5 px-10 bg-slate-600'>
        this is footer
      </footer>
    </div>
  )
}
