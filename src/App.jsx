import { Routes, Route, Link, Outlet } from 'react-router';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function Layout() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/about">About</Link> |{' '}
        <Link to="/contact">Contact</Link>
      </nav>
      <hr />
      {/* Outlet renders the nested route components */}
      <Outlet />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}