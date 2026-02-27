import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className={`sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b px-6 py-4 md:px-12 transition-colors ${isHome ? 'border-rose-200/50 dark:border-white/10 bg-white/70 dark:bg-background-dark/70 backdrop-blur-md' : 'border-primary/20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md'}`}>
      <div className="flex items-center gap-3 text-primary dark:text-primary-light">
        <div className={`size-9 flex items-center justify-center text-primary drop-shadow-sm ${!isHome && 'bg-primary/20 rounded-lg'}`}>
          <span className="material-symbols-outlined text-3xl">favorite</span>
        </div>
        <Link to="/" className="text-slate-900 dark:text-white text-xl font-serif font-bold tracking-tight">Secret Admirer</Link>
      </div>
      <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
        <nav className="flex items-center gap-8">
          <Link to="/" className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-primary' : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light'}`}>Home</Link>
          <Link to="/read" className={`text-sm font-medium transition-colors ${location.pathname === '/read' ? 'text-primary' : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light'}`}>Read Confessions</Link>
          <Link to="/write" className={`text-sm font-medium transition-colors ${location.pathname === '/write' ? 'text-primary' : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light'}`}>Submit Secret</Link>
        </nav>
      </div>
      <button className="md:hidden text-slate-900 dark:text-white p-2">
        <span className="material-symbols-outlined">menu</span>
      </button>
    </header>
  );
}
