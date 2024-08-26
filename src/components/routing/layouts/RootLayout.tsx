import { Outlet } from 'react-router-dom';
import Header from '../../UI/Header/Header';
import Footer from '../../UI/Footer/Footer';

export default function RootLayout() {
  return (
    <div className="wrapper">
      <Header />

      <h1 className="title-main block-default_shadowDown">
        Browse our database
      </h1>

      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
