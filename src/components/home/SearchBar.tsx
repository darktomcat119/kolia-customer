import { Search } from 'lucide-react';
import { useState } from 'react';

export function SearchBar({
  placeholder,
  onSubmit,
}: {
  placeholder: string;
  onSubmit?: (value: string) => void;
}) {
  const [value, setValue] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(value.trim());
      }}
      className="flex w-full min-w-0 items-center gap-3 rounded-3xl border border-black/5 bg-background px-4 py-3 shadow-sm"
    >
      <Search size={18} className="text-text-tertiary" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none placeholder:text-text-tertiary"
      />
      <button
        type="submit"
        className="hidden min-h-[40px] items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-dark sm:inline-flex"
      >
        Search
      </button>
    </form>
  );
}

