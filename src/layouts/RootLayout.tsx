import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

export default function RootLayout() {
  return (
    <div className="wrapper">
      <Header />

      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
