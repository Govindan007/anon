import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import WriteConfession from './pages/WriteConfession';
import ReadConfessions from './pages/ReadConfessions';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-200">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/write" element={<WriteConfession />} />
          <Route path="/read" element={<ReadConfessions />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
