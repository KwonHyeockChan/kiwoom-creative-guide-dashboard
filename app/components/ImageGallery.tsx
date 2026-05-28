'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Props {
  images: string[];
  label: string;
}

export function ImageGallery({ images, label }: Props) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  if (!images.length) return null;

  return (
    <>
      <div className="space-y-2">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</h4>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setLightbox(src)}
              className="group relative block overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/60 transition hover:border-violet-500/60"
            >
              <Image
                src={src}
                alt={`${label} ${i + 1}`}
                width={400}
                height={300}
                className="h-auto w-full object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
                <span className="rounded bg-black/60 px-2 py-1 text-xs text-white">크게 보기</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -right-3 -top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-slate-200 transition hover:bg-slate-600"
            >
              ✕
            </button>
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${lightbox}`}
              alt="크게 보기"
              className="max-h-[88vh] max-w-[88vw] rounded-xl object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
