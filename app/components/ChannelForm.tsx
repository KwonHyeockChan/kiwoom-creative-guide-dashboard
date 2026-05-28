'use client';

import { useState, useEffect } from 'react';
import type { AdFormat, TextField } from '../../lib/types';

function getByteLength(str: string): number {
  let bytes = 0;
  for (const ch of str) {
    bytes += ch.charCodeAt(0) > 0x7f ? 2 : 1;
  }
  return bytes;
}

function getLength(str: string, unit: 'char' | 'byte'): number {
  return unit === 'byte' ? getByteLength(str) : str.length;
}

function localKey(channelId: string, formatId: string, fieldId: string) {
  return `creative-guide:${channelId}:${formatId}:${fieldId}`;
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: TextField;
  value: string;
  onChange: (v: string) => void;
}) {
  const current = getLength(value, field.unit);
  const over = current > field.maxLength;

  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <label className="text-sm font-medium text-slate-200">
          {field.label}
          {field.required && <span className="ml-0.5 text-rose-400">*</span>}
        </label>
        <span className={`shrink-0 text-xs tabular-nums font-mono ${over ? 'text-rose-400 font-semibold' : 'text-slate-500'}`}>
          {current} / {field.maxLength}{field.unit === 'byte' ? 'byte' : '자'}
        </span>
      </div>
      {field.description && (
        <p className="text-xs text-slate-500">{field.description}</p>
      )}
      <textarea
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`${field.label} 입력`}
        className={`w-full resize-none rounded-lg border bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder-slate-600 outline-none transition focus:ring-2 ${
          over
            ? 'border-rose-500/60 focus:ring-rose-500/20'
            : 'border-slate-700/60 focus:border-violet-500/60 focus:ring-violet-500/20'
        }`}
      />
      {over && (
        <p className="text-xs text-rose-400">
          {current - field.maxLength}{field.unit === 'byte' ? 'byte' : '자'} 초과
        </p>
      )}
    </div>
  );
}

interface Props {
  channelId: string;
  format: AdFormat;
}

export function ChannelForm({ channelId, format }: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const loaded: Record<string, string> = {};
    for (const field of format.textFields) {
      const stored = localStorage.getItem(localKey(channelId, format.id, field.id));
      if (stored) loaded[field.id] = stored;
    }
    setValues(loaded);
    setMounted(true);
  }, [channelId, format.id]);

  function setValue(fieldId: string, value: string) {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
    localStorage.setItem(localKey(channelId, format.id, fieldId), value);
  }

  if (!mounted) return <div className="h-20 animate-pulse rounded-lg bg-slate-800/40" />;

  return (
    <div className="space-y-4">
      {format.textFields.map((field) => (
        <FieldInput
          key={field.id}
          field={field}
          value={values[field.id] ?? ''}
          onChange={(v) => setValue(field.id, v)}
        />
      ))}
    </div>
  );
}
