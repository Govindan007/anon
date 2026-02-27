export default function Footer() {
  return (
    <footer className="bg-white dark:bg-background-dark border-t border-rose-100 dark:border-white/10 py-12 mt-auto">
      <div className="container mx-auto px-4 flex flex-col items-center gap-8">
        <div className="flex flex-wrap items-center justify-center gap-8 text-slate-500 dark:text-slate-400 font-medium">
          <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
          <a className="hover:text-primary transition-colors" href="#">Community Guidelines</a>
          <a className="hover:text-primary transition-colors" href="#">Contact Us</a>
        </div>
        <div className="flex gap-6">
          <a className="w-11 h-11 rounded-full bg-rose-50 dark:bg-white/5 text-primary flex items-center justify-center hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300 shadow-sm" href="#">
            <span className="material-symbols-outlined text-[22px]">add_a_photo</span>
          </a>
          <a className="w-11 h-11 rounded-full bg-rose-50 dark:bg-white/5 text-primary flex items-center justify-center hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300 shadow-sm" href="#">
            <span className="material-symbols-outlined text-[22px]">flutter_dash</span>
          </a>
          <a className="w-11 h-11 rounded-full bg-rose-50 dark:bg-white/5 text-primary flex items-center justify-center hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300 shadow-sm" href="#">
            <span className="material-symbols-outlined text-[22px]">public</span>
          </a>
        </div>
        <p className="text-slate-400 dark:text-slate-500 text-sm text-center">
          © 2024 Secret Admirer. Made with <span className="text-primary animate-pulse inline-block">♥</span> for the hopeless romantics.
        </p>
      </div>
    </footer>
  );
}
