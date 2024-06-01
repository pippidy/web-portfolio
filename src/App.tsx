import './index.scss';
import { RouterProvider } from 'react-router-dom';
import AppRouter from './AppRouter';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={AppRouter} />
    </AuthProvider>
  );
}
