import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

export default function RootLayout() {
  return (
    <div className="wrapper">
      <Header />

      <h1 className="title-main block-default_shadowDown">
        Browse our collections
      </h1>

      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
