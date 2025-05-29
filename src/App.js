import { Routes, Route } from 'react-router-dom';
import { Layout } from './pages/Layout';
import { HomePage } from './pages/HomePage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}
