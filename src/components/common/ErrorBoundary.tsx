import React from 'react';
import { getCopySync } from '../../lib/i18nCopy';

type Props = { children: React.ReactNode };
type State = { hasError: boolean; message?: string };

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: unknown): State {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return { hasError: true, message };
  }

  render() {
    if (this.state.hasError) {
      const copy = getCopySync();
      return (
        <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-8">
          <div className="w-full max-w-lg rounded-3xl border border-black/5 bg-surface p-6 shadow-card">
            <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold">
              {copy.errorBoundaryTitle}
            </h1>
            <p className="mt-2 text-text-secondary">
              {copy.errorBoundaryHint}
            </p>
            {this.state.message ? (
              <pre className="mt-4 overflow-auto rounded-2xl bg-black/[0.03] p-4 text-xs text-text-tertiary">
                {this.state.message}
              </pre>
            ) : null}
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 inline-flex min-h-[48px] items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white hover:bg-primary-dark"
            >
              {copy.errorBoundaryRefresh}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

