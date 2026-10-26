import { useState } from 'react';
import { Compass } from 'lucide-react';
import { APP_IMAGES, type AppImageKey } from '../assets/imageMap';

interface SafeImageProps {
  imageKey: AppImageKey;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function SafeImage({
  imageKey,
  alt,
  className = '',
  fallbackTitle = 'Laboratorio Matematico',
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const src = APP_IMAGES[imageKey];

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-sky-50 text-slate-600 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Compass className="w-10 h-10 text-sky-700 mb-2 shrink-0" />
        <span className="text-sm font-medium text-slate-700">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
