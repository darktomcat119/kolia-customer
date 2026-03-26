import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Layout } from './components/Layout';
import { AuthProvider, useAuth } from './lib/auth';
import { CartProvider } from './lib/cart';
import { I18nProvider } from './lib/i18n';
import type { ReactNode } from 'react';

const Home = lazy(async () => ({ default: (await import('./pages/Home')).Home }));
const Restaurants = lazy(async () => ({ default: (await import('./pages/Restaurants')).Restaurants }));
const RestaurantDetail = lazy(async () => ({ default: (await import('./pages/RestaurantDetail')).RestaurantDetail }));
const Cart = lazy(async () => ({ default: (await import('./pages/Cart')).Cart }));
const Checkout = lazy(async () => ({ default: (await import('./pages/Checkout')).Checkout }));
const Orders = lazy(async () => ({ default: (await import('./pages/Orders')).Orders }));
const Profile = lazy(async () => ({ default: (await import('./pages/Profile')).Profile }));
const Login = lazy(async () => ({ default: (await import('./pages/Login')).Login }));
const Register = lazy(async () => ({ default: (await import('./pages/Register')).Register }));
const AuthConfirm = lazy(async () => ({ default: (await import('./pages/AuthConfirm')).AuthConfirm }));
const ResetPassword = lazy(async () => ({ default: (await import('./pages/ResetPassword')).ResetPassword }));

function AuthGuard({ children }: { children: ReactNode }) {
  const { session, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="flex min-h-[60dvh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
      </div>
    );
  }
  if (!session) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function GuestGuard({ children }: { children: ReactNode }) {
  const { session, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="flex min-h-[60dvh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
      </div>
    );
  }
  if (session) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function RouteFallback() {
  return (
    <div className="flex min-h-[40dvh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <I18nProvider>
        <AuthProvider>
          <CartProvider>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/restaurants" element={<Restaurants />} />
                <Route path="/restaurant/:id" element={<RestaurantDetail />} />
                <Route
                  path="/cart"
                  element={(
                    <AuthGuard>
                      <Cart />
                    </AuthGuard>
                  )}
                />
                <Route
                  path="/checkout"
                  element={(
                    <AuthGuard>
                      <Checkout />
                    </AuthGuard>
                  )}
                />
                <Route
                  path="/orders"
                  element={(
                    <AuthGuard>
                      <Orders />
                    </AuthGuard>
                  )}
                />
                <Route
                  path="/profile"
                  element={(
                    <AuthGuard>
                      <Profile />
                    </AuthGuard>
                  )}
                />
              </Route>

              {/* Auth */}
              <Route
                path="/login"
                element={(
                  <GuestGuard>
                    <Login />
                  </GuestGuard>
                )}
              />
              <Route
                path="/register"
                element={(
                  <GuestGuard>
                    <Register />
                  </GuestGuard>
                )}
              />
              <Route path="/auth/confirm" element={<AuthConfirm />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </CartProvider>
        </AuthProvider>
      </I18nProvider>
    </BrowserRouter>
  );
}

