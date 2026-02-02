"use client";
import { useState, useEffect } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); 

  // Dark Mode Logic
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setDarkMode(true);
    }
  };

  // Auto-close mobile menu
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300`}>
        
        {/* --- HEADER --- */}
        <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            
            {/* LOGO */}
            <a href="/" className="flex items-center gap-2 group z-50 relative">
              <div className="bg-indigo-600 rounded-lg p-1.5 text-white group-hover:bg-indigo-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                PayCheck<span className="text-indigo-600 dark:text-indigo-400">USA</span>
              </span>
            </a>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center gap-6">
              <nav className="flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
                <a href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Calculator</a>
                <Link href="/states" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">States</Link>
                {/* NEW LINKS ADDED HERE */}
                <Link href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</Link>
                <Link href="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</Link>
              </nav>
              
              {/* Dark Mode Button */}
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors"
              >
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                )}
              </button>
            </div>

            {/* MOBILE BUTTON */}
            <div className="flex items-center gap-4 md:hidden">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400"
              >
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                )}
              </button>

              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
                </svg>
              </button>
            </div>
          </div>

          {/* MOBILE MENU DROPDOWN */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl p-4 flex flex-col gap-2">
               <a href="/" className="block p-4 rounded-xl bg-slate-50 dark:bg-slate-800 font-bold text-slate-900 dark:text-white" onClick={() => setIsMobileMenuOpen(false)}>Calculator</a>
               <Link href="/states" className="block p-4 rounded-xl bg-slate-50 dark:bg-slate-800 font-bold text-slate-900 dark:text-white" onClick={() => setIsMobileMenuOpen(false)}>Browse States</Link>
               {/* NEW LINKS ADDED HERE */}
               <Link href="/about" className="block p-4 rounded-xl bg-slate-50 dark:bg-slate-800 font-bold text-slate-900 dark:text-white" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
               <Link href="/contact" className="block p-4 rounded-xl bg-slate-50 dark:bg-slate-800 font-bold text-slate-900 dark:text-white" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            </div>
          )}
        </header>

        {/* --- MAIN CONTENT --- */}
        <div className="flex-grow">
          {children}
        </div>

        {/* --- FOOTER --- */}
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12">
          <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <span className="font-bold text-lg text-slate-900 dark:text-white">
                PayCheck<span className="text-indigo-600 dark:text-indigo-400">USA</span>
              </span>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Accurate salary tools for the modern workforce.
              </p>
            </div>
            
            {/* NEW FOOTER LINKS */}
            <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
              <Link href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms</Link>
            </div>

            <div className="text-sm text-slate-400 text-center md:text-right">
              <p>© 2026 PayCheck USA. All rights reserved.</p>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}