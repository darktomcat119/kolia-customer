import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { useCopy } from '../lib/i18n';

export function Profile() {
  const { session } = useAuth();
  const copy = useCopy();
  const email = session?.user?.email;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-black/5 bg-surface p-6 shadow-sm">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">{copy.profileTitle}</h2>
        <p className="mt-2 text-text-secondary">
          {email ? (
            <>
              {copy.profileSignedInAs}: <span className="font-semibold text-text-primary">{email}</span>
            </>
          ) : (
            copy.profileSubtitle
          )}
        </p>
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
    </div>
  );
}
