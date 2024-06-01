import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

// Layouts
import RootLayout from './layouts/RootLayout';

// Pages
import Home from './pages/Home';
import Genres from './pages/Genres';
import Characters from './pages/Characters';
import Companies from './pages/Companies';
import GameInfo from './pages/InfoPages/GameInfo';
import CompanyInfo from './pages/InfoPages/CompanyInfo';
import CharacterInfo from './pages/InfoPages/CharacterInfo';
import Search from './pages/Search';
import NotFound from './pages/ErrorPage/NotFound';
import Profile from './pages/Profile';
import AuthError from './pages/ErrorPage/AuthError';

const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />

      <Route path="profile" element={<Profile />} />

      <Route path="search" element={<Search />} />

      <Route path="games/genres/:id" element={<Genres />} />
      <Route path="game/:id" element={<GameInfo />} />

      <Route path="characters" element={<Characters />} />
      <Route path="character/:id" element={<CharacterInfo />} />

      <Route path="companies" element={<Companies />} />
      <Route path="company/:id" element={<CompanyInfo />} />

      <Route path="auth-error" element={<AuthError />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default AppRouter;
