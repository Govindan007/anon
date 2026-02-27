import React, { useState } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';

export default function WriteConfession() {
  const [confession, setConfession] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const maxLength = 500;
  const currentLength = confession.length;
  const fillPercentage = Math.min(100, (currentLength / maxLength) * 100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (confession.trim()) {
      setIsSubmitting(true);
      try {
        const { error } = await supabase
          .from('user')
          .insert([{ msg: confession.trim(), like: 0 }]);
          
        if (error) throw error;
        setIsSubmitted(true);
      } catch (error) {
        console.error('Error saving confession:', error);
        alert('Failed to send your confession. Please check your Supabase connection.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 relative overflow-hidden bg-background-light dark:bg-background-dark">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md bg-paper-light dark:bg-paper-dark rounded-xl shadow-2xl border border-primary/10 p-12 text-center flex flex-col items-center"
        >
          <div className="w-24 h-24 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-5xl text-primary animate-pulse">mark_email_read</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">Sealed & Sent</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">Your confession is safe with us and has been sent into the void.</p>
          <button 
            onClick={() => {
              setConfession('');
              setIsSubmitted(false);
            }}
            className="px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-full font-bold transition-all shadow-lg shadow-primary/30"
          >
            Write Another
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 relative overflow-hidden bg-background-light dark:bg-background-dark">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl bg-paper-light dark:bg-paper-dark rounded-xl shadow-2xl border border-primary/10 relative overflow-hidden flex flex-col"
      >
        <div className="h-2 w-full bg-gradient-to-r from-primary/40 via-purple-400/40 to-primary/40 opacity-70"></div>
        <div className="p-8 sm:p-12 md:p-16 flex flex-col gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">history_edu</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">Write Your Confession</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">Speak from the heart, hidden from view.</p>
          </div>
          
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="relative group">
              <label className="sr-only" htmlFor="confession">Your Confession</label>
              <div className="absolute -top-3 -left-2 z-10 pointer-events-none opacity-20">
                <span className="material-symbols-outlined text-primary text-5xl">format_quote</span>
              </div>
              <textarea 
                className="w-full bg-background-light dark:bg-[#150d18] border-0 rounded-lg p-8 text-xl text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-1 focus:ring-primary/50 resize-none shadow-inner leading-loose font-handwriting tracking-wide min-h-[300px]" 
                id="confession" 
                name="confession" 
                placeholder="Dear someone I can’t stop thinking about..."
                value={confession}
                onChange={(e) => setConfession(e.target.value.slice(0, maxLength))}
                required
              ></textarea>
              <div className="absolute bottom-4 right-4 flex items-end gap-2 pointer-events-none">
                <div className="flex flex-col items-center">
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <span className="material-symbols-outlined absolute text-slate-300 dark:text-slate-700 text-3xl">favorite</span>
                    <span 
                      className="material-symbols-outlined absolute text-primary text-3xl overflow-hidden h-full w-full transition-all duration-300" 
                      style={{ clipPath: `inset(${100 - fillPercentage}% 0 0 0)` }}
                    >
                      favorite
                    </span> 
                  </div>
                  <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 mt-1 tracking-wider">{currentLength}/{maxLength}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-end gap-6 border-t border-slate-100 dark:border-slate-800 pt-8">
              <button 
                type="submit"
                disabled={!confession.trim() || isSubmitting}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-secondary hover:bg-purple-500 disabled:opacity-50 disabled:hover:bg-secondary text-white rounded-full font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg shadow-secondary/30 w-full sm:w-auto overflow-hidden"
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-72 group-hover:h-72 opacity-10"></span>
                <span>{isSubmitting ? 'Sending...' : 'Seal & Send'}</span>
                <span className="text-xl animate-pulse">💌</span>
              </button>
            </div>
          </form>
          
          <div className="text-center pt-2">
            <p className="text-slate-400 dark:text-slate-500 text-sm flex items-center justify-center gap-2 italic">
              <span className="material-symbols-outlined text-base">spa</span>
              Be kind. Words carry weight.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
