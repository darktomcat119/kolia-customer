import { useState } from 'react';

export function LazyImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative ${className ?? ''}`}>
      {!loaded && !failed ? (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-black/[0.04] via-black/[0.08] to-black/[0.04]" />
      ) : null}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => {
          setLoaded(true);
          setFailed(true);
        }}
        className={`h-full w-full object-cover transition duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
      {failed ? (
        <div className="absolute inset-0 grid place-items-center bg-black/[0.06] text-xs font-semibold text-text-tertiary">
          Image unavailable
        </div>
      ) : null}
    </div>
  );
}

