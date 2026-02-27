import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-hero-gradient dark:bg-hero-gradient-dark text-slate-800 dark:text-slate-200 font-display antialiased selection:bg-primary selection:text-white">
      <main className="flex-grow flex flex-col items-center justify-center relative pt-12 pb-24 px-4 sm:px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-200/40 dark:bg-primary/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] bg-primary/20 dark:bg-purple-900/20 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen"></div>
          <span className="material-symbols-outlined absolute top-24 left-[8%] text-primary/30 dark:text-primary/20 text-5xl floating-heart" style={{ animationDuration: '7s', animationDelay: '0s' }}>favorite</span>
          <span className="material-symbols-outlined absolute bottom-32 right-[12%] text-purple-400/30 dark:text-purple-400/20 text-7xl floating-heart" style={{ animationDuration: '9s', animationDelay: '1s' }}>favorite</span>
          <span className="material-symbols-outlined absolute top-1/3 right-[8%] text-primary/20 dark:text-primary/10 text-4xl floating-heart" style={{ animationDuration: '6s', animationDelay: '2s' }}>favorite_border</span>
          <span className="material-symbols-outlined absolute bottom-1/4 left-[15%] text-purple-300/30 dark:text-purple-300/20 text-6xl floating-heart" style={{ animationDuration: '8s', animationDelay: '3s' }}>favorite</span>
          <span className="material-symbols-outlined absolute top-40 right-[25%] text-primary/15 dark:text-primary/10 text-3xl floating-heart" style={{ animationDuration: '10s', animationDelay: '1.5s' }}>favorite</span>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container max-w-5xl z-10 w-full relative"
        >
          <div className="glass-card rounded-3xl p-1 md:p-2 shadow-2xl relative overflow-hidden transform hover:scale-[1.005] transition-transform duration-700">
            <div className="bg-white/80 dark:bg-background-dark/80 rounded-[1.3rem] letter-paper-texture p-8 md:p-16 text-center relative overflow-hidden border border-white/40 dark:border-white/5">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-gradient-to-b from-primary/10 to-transparent rounded-b-full blur-xl"></div>
              <div className="relative z-10 flex flex-col items-center gap-8 md:gap-10">
                <span className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-100/80 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800/50 px-5 py-2 text-xs font-semibold text-primary dark:text-purple-200 uppercase tracking-widest shadow-sm">
                  <span className="material-symbols-outlined text-sm">lock</span>
                  Anonymous & Safe
                </span>
                
                <div className="space-y-4 max-w-4xl mx-auto">
                  <h1 className="text-slate-900 dark:text-white text-5xl md:text-7xl font-serif font-medium leading-tight tracking-tight drop-shadow-sm">
                    Confess What Your <br className="hidden md:block"/> Heart Has Been Hiding <span className="text-primary inline-block animate-pulse">💖</span>
                  </h1>
                  <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                    Share your deepest feelings anonymously this Valentine's Day. A safe, judgment-free space for love letters, secret crushes, and untold stories waiting to be heard.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-5 mt-6 w-full justify-center items-center">
                  <Link to="/write" className="group relative flex items-center justify-center rounded-full h-14 px-10 bg-primary hover:bg-primary-dark text-white text-base font-semibold tracking-wide shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 transform hover:-translate-y-1">
                    <div className="absolute inset-0 rounded-full bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="material-symbols-outlined mr-2.5 text-[22px]">edit_note</span>
                    Write a Confession
                  </Link>
                  <Link to="/read" className="flex items-center justify-center rounded-full h-14 px-10 bg-transparent border-2 border-primary text-primary dark:text-purple-200 dark:border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-base font-semibold tracking-wide transition-all duration-300 hover:shadow-md hover:shadow-primary/10">
                    <span className="material-symbols-outlined mr-2.5 text-[22px]">mark_email_unread</span>
                    Read Confessions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="container max-w-5xl mt-24 md:mt-36 w-full px-4"
        >
          <div className="flex flex-col gap-4 text-center mb-16">
            <h2 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-serif font-bold">How It Works</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">Express yourself freely and securely in three simple steps.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-white/5 rounded-2xl p-8 shadow-sm border border-purple-100 dark:border-white/10 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 dark:hover:border-primary/30 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-900/20 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-3xl">visibility_off</span>
              </div>
              <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-3">Write Anonymously</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Draft your letter without revealing your identity. Your secrets are encrypted and safe with us.</p>
            </div>
            
            <div className="bg-white dark:bg-white/5 rounded-2xl p-8 shadow-sm border border-purple-100 dark:border-white/10 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 dark:hover:border-primary/30 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-900/20 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-3xl">favorite</span>
              </div>
              <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-3">Share Your Heart</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Send your confession into the world publicly or create a private link for that special someone.</p>
            </div>
            
            <div className="bg-white dark:bg-white/5 rounded-2xl p-8 shadow-sm border border-purple-100 dark:border-white/10 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 dark:hover:border-primary/30 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-900/20 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-3xl">diversity_1</span>
              </div>
              <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-3">Connect Emotionally</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Read stories from others, feel less alone, and find solace in shared human experiences.</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
