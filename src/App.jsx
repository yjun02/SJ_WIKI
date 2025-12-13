import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ChapterPage } from './pages/ChapterPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/chapter/4" replace />} />
          <Route path="/chapter/:id" element={<ChapterPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
