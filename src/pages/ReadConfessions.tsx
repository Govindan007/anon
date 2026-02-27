import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

// Define the type based on the user's table structure
interface Confession {
  id?: number; // Assuming Supabase generated an ID column
  msg: string;
  like: number;
  created_at?: string; // Assuming Supabase generated a created_at column
}

export default function ReadConfessions() {
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchConfessions();
  }, []);

  const fetchConfessions = async () => {
    setIsLoading(true);
    try {
      // Fetch from the 'user' table
      const { data, error } = await supabase
        .from('user')
        .select('*')
        .limit(50);

      if (error) throw error;
      setConfessions(data || []);
    } catch (err: any) {
      console.error('Error fetching confessions:', err);
      setError(err.message || 'Failed to load confessions. Check your Supabase connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async (confession: Confession) => {
    // Optimistic update
    const newLikes = (confession.like || 0) + 1;
    
    setConfessions(prev => prev.map(c => {
      // If there's an ID, match by ID. Otherwise, match by msg (fallback)
      const isMatch = confession.id ? c.id === confession.id : c.msg === confession.msg;
      return isMatch ? { ...c, like: newLikes } : c;
    }));

    try {
      // Update in Supabase
      let query = supabase.from('user').update({ like: newLikes });
      
      // Use ID if available, otherwise fallback to matching the exact message
      if (confession.id) {
        query = query.eq('id', confession.id);
      } else {
        query = query.eq('msg', confession.msg);
      }
      
      const { error } = await query;
      if (error) throw error;
    } catch (err) {
      console.error('Error updating like:', err);
      // Revert optimistic update on failure
      setConfessions(prev => prev.map(c => {
        const isMatch = confession.id ? c.id === confession.id : c.msg === confession.msg;
        return isMatch ? { ...c, like: confession.like } : c;
      }));
    }
  };

  return (
    <div className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Anonymous Feed
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3">Read Confessions</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Dive into a world of hidden feelings. Unseal the envelopes of hearts poured out anonymously.
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800/50">
          <p className="font-medium">Connection Error</p>
          <p className="text-sm mt-1">{error}</p>
          <p className="text-sm mt-2">Please ensure you have added VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.</p>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : confessions.length === 0 && !error ? (
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">inbox</span>
          <h3 className="text-xl font-medium text-slate-600 dark:text-slate-400">No confessions yet</h3>
          <p className="text-slate-500 mt-2 mb-6">Be the first to share your heart with the world.</p>
          <Link to="/write" className="inline-flex px-6 py-2 bg-primary text-white font-bold rounded-xl text-sm hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
            Write Confession
          </Link>
        </div>
      ) : (
        <div className="masonry-grid pb-12">
          {confessions.map((confession, index) => (
            <motion.div 
              key={confession.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (index % 10) * 0.1 }}
              className="break-inside-avoid mb-6 group"
            >
              <div className="envelope-card bg-white dark:bg-transparent rounded-2xl p-6 md:p-8 hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-all duration-300 hover:shadow-envelope hover:-translate-y-1 shadow-sm border border-slate-200 dark:border-white/10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-50"></div>
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border text-purple-400 bg-purple-500/10 border-purple-500/20">
                    <span className="material-symbols-outlined text-[14px]">lock</span> 
                    Secret
                  </span>
                  {confession.created_at && (
                    <span className="text-xs text-slate-500 font-medium">
                      {new Date(confession.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </div>
                
                <div className="relative">
                  <p className="text-lg md:text-xl text-slate-700 dark:text-slate-200 font-light leading-relaxed relative z-10 whitespace-pre-wrap">
                    {confession.msg}
                  </p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <div className="flex gap-4">
                    <button 
                      onClick={() => handleLike(confession)}
                      className="flex items-center gap-1.5 group/btn text-slate-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
                    >
                      <span className="material-symbols-outlined text-xl group-hover/btn:fill-current group-hover/btn:scale-110 transition-transform">favorite</span>
                      <span className="text-xs font-medium">{confession.like || 0}</span>
                    </button>
                  </div>
                  <button className="text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-xl">share</span>
                  </button>
                </div>
              </div>
              
              {/* Insert CTA card after 2nd item */}
              {index === 1 && (
                <div className="break-inside-avoid mb-6 mt-6">
                  <div className="rounded-2xl p-8 bg-gradient-to-br from-primary to-purple-800 text-center flex flex-col items-center justify-center shadow-lg shadow-primary/10">
                    <span className="material-symbols-outlined text-4xl text-white/80 mb-4">mail</span>
                    <h3 className="text-xl font-bold text-white mb-2">Have a secret to share?</h3>
                    <p className="text-white/70 text-sm mb-6 max-w-[200px]">Release your feelings anonymously into the void.</p>
                    <Link to="/write" className="px-6 py-2 bg-white text-primary font-bold rounded-xl text-sm hover:bg-slate-100 transition-colors shadow-xl">
                      Write Confession
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
