import './index.scss';
import {
  Route,
  RouterProvider,
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="games/genres/:id" element={<Genres />} />
      <Route path="game/:id" element={<GameInfo />} />

      <Route path="characters" element={<Characters />} />
      <Route path="character/:id" element={<CharacterInfo />} />

      <Route path="companies" element={<Companies />} />
      <Route path="company/:id" element={<CompanyInfo />} />
    </Route>
  )
);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
