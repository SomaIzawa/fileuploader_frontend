import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../providers/auth';

export const ProtectedPage = () => {
  const { userId } = useContext(AuthContext)
  if(userId == -1){
    return (
      <Navigate replace to="/login" />
    )
  }
  return (
    <Outlet />
  )
}
