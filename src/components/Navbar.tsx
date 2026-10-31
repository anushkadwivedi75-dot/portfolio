import { useState, useEffect } from 'react';
import { Menu, X, FileText, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenResume: () => void;
}

export default function Navbar({ onOpenResume }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'work', 'snippets', 'about', 'contact'];
      const scrollPosition = window.scrollY + 220;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work', id: 'work' },
    { name: 'Lab', href: '#snippets', id: 'snippets' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-[#09090b]/85 backdrop-blur-md border-b border-zinc-200/80 dark:border-white/[0.08] py-3.5 shadow-sm dark:shadow-xl dark:shadow-black/20'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Personal Wordmark */}
        <a
          href="#hero"
          className="group flex items-center gap-2.5 text-zinc-900 dark:text-zinc-100 hover:text-violet-600 dark:hover:text-white transition-colors cursor-pointer"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-violet-600 dark:bg-violet-400 group-hover:scale-125 transition-transform"></span>
          <span className="font-semibold tracking-tight text-sm sm:text-base font-sans">
            {personalInfo.name}
          </span>
          <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono hidden md:inline-block">
            / AI &amp; Systems
          </span>
        </a>

        {/* Desktop Navigation Links (Capsule Design) */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-100/90 dark:bg-[#13141a]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-zinc-200 dark:border-white/[0.08] shadow-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative px-3.5 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-violet-900 bg-violet-200/60 dark:text-white dark:bg-white/[0.08] font-semibold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-white/[0.04]'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Action Controls: Theme Switch + Resume + Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-white/[0.1] transition-all cursor-pointer shadow-sm hover:scale-105"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-amber-400 transition-transform rotate-0 hover:rotate-45" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-violet-600 transition-transform -rotate-12 hover:rotate-0" />
            )}
          </button>

          {/* Resume Trigger */}
          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-200 border border-zinc-700 dark:border-white/[0.1] hover:border-violet-400/50 transition-all cursor-pointer group shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-violet-400 group-hover:text-violet-300" />
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-400 group-hover:text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/[0.08] cursor-pointer"
            aria-label="Toggle mobile navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-4 p-5 rounded-3xl bg-white dark:bg-[#0c0d14] border border-zinc-200 dark:border-white/[0.09] shadow-2xl space-y-4 animate-fade-in">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                  activeSection === link.id
                    ? 'text-violet-700 bg-violet-100/70 dark:text-white dark:bg-white/[0.08]'
                    : 'text-zinc-700 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/[0.04]'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-zinc-200 dark:border-white/[0.08] flex items-center justify-between text-xs">
            <span className="text-zinc-500 font-mono">Theme Mode</span>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-white/[0.08] font-mono text-xs cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-violet-600" />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
