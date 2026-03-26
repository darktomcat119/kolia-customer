import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Home as HomeIcon, User } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../lib/auth';
import { useCopy } from '../lib/i18n';
import { LanguageSwitcher } from './common/LanguageSwitcher';
import logo from '../../../website/public/logo.png';

const linkBase =
  'inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors';

export function Layout() {
  const location = useLocation();
  const { session, signOut } = useAuth();
  const copy = useCopy();
  const hideNav =
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname.startsWith('/auth/');

  return (
    <div className="min-h-[100dvh] w-full min-w-0 bg-background">
      {!hideNav && (
        <header className="sticky top-0 z-30 border-b border-black/5 bg-surface/80 pt-[env(safe-area-inset-top)] backdrop-blur">
          <div className="mx-auto w-full min-w-0 max-w-7xl px-4 py-3 sm:px-6">
            <div className="flex w-full min-w-0 flex-wrap items-center justify-between gap-3">
              <NavLink to="/" className="flex min-w-0 items-center">
                <img src={logo} alt="Kolia" className="h-10 w-auto shrink-0 rounded-xl object-contain" />
              </NavLink>

              <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                <LanguageSwitcher />
                <nav className="hidden items-center gap-2 sm:flex">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `${linkBase} ${isActive ? 'bg-primary text-white' : 'text-text-secondary hover:bg-black/[0.03]'}`
                    }
                  >
                    <HomeIcon size={18} /> {copy.navHome}
                  </NavLink>
                  <NavLink
                    to="/restaurants"
                    className={({ isActive }) =>
                      `${linkBase} ${isActive ? 'bg-primary text-white' : 'text-text-secondary hover:bg-black/[0.03]'}`
                    }
                  >
                    <Search size={18} /> {copy.navExplore}
                  </NavLink>
                  <NavLink
                    to={session ? '/cart' : '/login'}
                    className={({ isActive }) =>
                      `${linkBase} ${isActive ? 'bg-primary text-white' : 'text-text-secondary hover:bg-black/[0.03]'}`
                    }
                  >
                    <ShoppingBag size={18} /> {copy.navCart}
                  </NavLink>
                  <NavLink
                    to={session ? '/profile' : '/login'}
                    className={({ isActive }) =>
                      `${linkBase} ${isActive ? 'bg-primary text-white' : 'text-text-secondary hover:bg-black/[0.03]'}`
                    }
                  >
                    <User size={18} /> {copy.navProfile}
                  </NavLink>
                  {session ? (
                    <button
                      type="button"
                      onClick={() => {
                        void signOut();
                      }}
                      className="inline-flex min-h-[44px] items-center rounded-full bg-black/[0.04] px-4 py-2 text-sm font-semibold text-text-primary hover:bg-black/[0.06]"
                    >
                      {copy.navLogout}
                    </button>
                  ) : (
                    <NavLink
                      to="/login"
                      className="inline-flex min-h-[44px] items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
                    >
                      {copy.navLogin}
                    </NavLink>
                  )}
                </nav>
              </div>
            </div>

            <nav className="mt-3 grid w-full min-w-0 grid-cols-4 gap-2 sm:hidden">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${linkBase} justify-center ${isActive ? 'bg-primary text-white' : 'text-text-secondary hover:bg-black/[0.03]'}`
                }
                aria-label={copy.navHome}
              >
                <HomeIcon size={18} />
              </NavLink>
              <NavLink
                to="/restaurants"
                className={({ isActive }) =>
                  `${linkBase} justify-center ${isActive ? 'bg-primary text-white' : 'text-text-secondary hover:bg-black/[0.03]'}`
                }
                aria-label={copy.navExplore}
              >
                <Search size={18} />
              </NavLink>
              <NavLink
                to={session ? '/cart' : '/login'}
                className={({ isActive }) =>
                  `${linkBase} justify-center ${isActive ? 'bg-primary text-white' : 'text-text-secondary hover:bg-black/[0.03]'}`
                }
                aria-label={copy.navCart}
              >
                <ShoppingBag size={18} />
              </NavLink>
              <NavLink
                to={session ? '/profile' : '/login'}
                className={({ isActive }) =>
                  `${linkBase} justify-center ${isActive ? 'bg-primary text-white' : 'text-text-secondary hover:bg-black/[0.03]'}`
                }
                aria-label={copy.navProfile}
              >
                <User size={18} />
              </NavLink>
            </nav>
          </div>
        </header>
      )}

      <main className="mx-auto w-full min-w-0 max-w-7xl px-4 py-6 sm:px-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            className="w-full min-w-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {!hideNav && (
        <footer className="border-t border-black/5 bg-surface pb-[max(1rem,env(safe-area-inset-bottom))] pt-6">
          <div className="mx-auto w-full min-w-0 max-w-7xl px-4 text-xs text-text-tertiary sm:px-6">
            © {new Date().getFullYear()} Kolia
          </div>
        </footer>
      )}
    </div>
  );
}

