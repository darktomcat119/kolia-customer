import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, RefreshCw, Trash2 } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { useCopy } from '../lib/i18n';
import { api } from '../lib/api';

export function Profile() {
  const { session, signOut } = useAuth();
  const copy = useCopy();
  const navigate = useNavigate();
  const email = session?.user?.email;
  const fullName = session?.user?.user_metadata?.full_name as string | undefined;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  return (
    <div className="space-y-6">
      {/* User info */}
      <div className="rounded-3xl border border-black/5 bg-surface p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
            {(fullName || email || '?')[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            {fullName && (
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold truncate">
                {fullName}
              </h2>
            )}
            <p className="text-sm text-text-secondary truncate">{email}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/orders"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            {copy.profileViewOrders}
          </Link>
          <Link
            to="/restaurants"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-secondary px-7 py-3 text-sm font-semibold text-secondary hover:bg-secondary hover:text-white"
          >
            {copy.navExplore}
          </Link>
        </div>
      </div>

      {/* Account actions */}
      <div className="rounded-3xl border border-black/5 bg-surface shadow-sm divide-y divide-black/5">
        <button
          type="button"
          onClick={() => {
            void signOut().then(() => navigate('/login', { replace: true }));
          }}
          className="flex w-full items-center gap-3 px-6 py-4 text-left text-sm font-semibold text-text-primary hover:bg-black/[0.02] transition-colors rounded-t-3xl"
        >
          <RefreshCw size={18} className="text-text-secondary" />
          {copy.profileSwitchAccount}
        </button>
        <button
          type="button"
          onClick={() => {
            void signOut().then(() => navigate('/login', { replace: true }));
          }}
          className="flex w-full items-center gap-3 px-6 py-4 text-left text-sm font-semibold text-red-600 hover:bg-red-50/50 transition-colors"
        >
          <LogOut size={18} />
          {copy.profileLogout}
        </button>
        <button
          type="button"
          onClick={() => setShowDeleteDialog(true)}
          className="flex w-full items-center gap-3 px-6 py-4 text-left text-sm font-semibold text-red-600 hover:bg-red-50/50 transition-colors rounded-b-3xl"
        >
          <Trash2 size={18} />
          {copy.profileDeleteAccount}
        </button>
      </div>

      {/* Delete confirmation dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-text-primary">
              {copy.profileDeleteConfirmTitle}
            </h3>
            <p className="mt-2 text-sm text-text-secondary">{copy.profileDeleteConfirmBody}</p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setShowDeleteDialog(false)}
                className="flex-1 rounded-full border border-black/10 py-2.5 text-sm font-semibold text-text-secondary hover:bg-black/[0.03] disabled:opacity-50"
              >
                {copy.profileDeleteConfirmCancel}
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={async () => {
                  setDeleting(true);
                  try {
                    await api.delete('/api/account');
                    await signOut();
                    navigate('/login', { replace: true });
                  } catch {
                    setDeleting(false);
                  }
                }}
                className="flex-1 rounded-full bg-red-600 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? copy.profileDeleting : copy.profileDeleteConfirmOk}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
