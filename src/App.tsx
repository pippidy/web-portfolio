import './index.scss';
import { RouterProvider } from 'react-router-dom';
import AppRouter from './components/routing/AppRouter';
import { AuthProvider } from './components/contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={AppRouter} />
    </AuthProvider>
  );
}
