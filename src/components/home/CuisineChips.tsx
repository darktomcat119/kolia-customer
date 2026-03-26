import { useMemo, useState } from 'react';

export function CuisineChips<T extends { id: string; label: string }>({
  items,
  defaultSelectedId = 'all',
  onChange,
}: {
  items: readonly T[];
  defaultSelectedId?: string;
  onChange?: (id: string) => void;
}) {
  const initial = useMemo(() => items.find((i) => i.id === defaultSelectedId)?.id ?? items[0]?.id ?? '', [
    items,
    defaultSelectedId,
  ]);
  const [selected, setSelected] = useState(initial);

  return (
    <div className="-mx-1 flex w-full min-w-0 snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-1">
      {items.map((c) => {
        const isActive = c.id === selected;
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => {
              setSelected(c.id);
              onChange?.(c.id);
            }}
            className={[
              'snap-start whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
              isActive
                ? 'border-primary bg-primary text-white'
                : 'border-black/5 bg-surface text-text-secondary hover:bg-black/[0.03]',
            ].join(' ')}
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}

