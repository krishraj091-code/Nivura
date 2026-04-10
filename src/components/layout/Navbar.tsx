import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "../ThemeProvider";
import { cn } from "@/src/lib/utils";
import { useData } from "@/src/hooks/useData";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/#services" },
  { name: "Benefits", path: "/#benefits" },
  { name: "FAQ", path: "/#faq" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const { data } = useData();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-4" : "py-6"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between rounded-full px-6 py-3 transition-all duration-300",
            isScrolled ? "glass-panel" : "bg-transparent"
          )}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 z-50">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="font-display font-bold text-lg">N</span>
            </div>
            <span className="font-display text-xl font-semibold tracking-tight">
              Nuvira Global
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                link.path.includes("#") ? (
                  <a
                    key={link.name}
                    href={link.path}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-foreground/80"
                    )}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-foreground/80"
                    )}
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>
            
            <div className="flex items-center gap-4 border-l border-border pl-4">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <Link
                to="/schedule"
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-all hover:bg-accent/90 hover:scale-105 active:scale-95"
              >
                Schedule Meeting
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden z-50">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute left-4 right-4 top-24 rounded-3xl glass-panel p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                link.path.includes("#") ? (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "text-lg font-medium p-2 rounded-xl transition-colors hover:bg-black/5 dark:hover:bg-white/10",
                      location.pathname === link.path
                        ? "text-primary bg-black/5 dark:bg-white/10"
                        : "text-foreground"
                    )}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={cn(
                      "text-lg font-medium p-2 rounded-xl transition-colors hover:bg-black/5 dark:hover:bg-white/10",
                      location.pathname === link.path
                        ? "text-primary bg-black/5 dark:bg-white/10"
                        : "text-foreground"
                    )}
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <div className="h-px w-full bg-border my-2" />
              <Link
                to="/schedule"
                className="rounded-xl bg-accent px-5 py-3 text-center text-base font-medium text-accent-foreground transition-all active:scale-95"
              >
                Schedule Meeting
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
