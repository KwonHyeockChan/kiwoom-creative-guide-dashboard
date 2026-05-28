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
  initialValues?: Record<string, string>;
}

export function ChannelForm({ channelId, format, initialValues = {} }: Props) {
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    setValues(initialValues);
    setStatus('idle');
  }, [channelId, format.id]);

  function setValue(fieldId: string, value: string) {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
    if (status === 'saved') setStatus('idle');
  }

  async function handleSave() {
    setStatus('saving');
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channel_id: channelId, format_id: format.id, fields: values }),
      });
      if (!res.ok) throw new Error();
      setStatus('saved');
    } catch {
      setStatus('error');
    }
  }

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

      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={handleSave}
          disabled={status === 'saving'}
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:opacity-60"
        >
          {status === 'saving' ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : null}
          저장하기
        </button>
        {status === 'saved' && (
          <span className="flex items-center gap-1.5 text-sm text-emerald-400 font-medium">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            저장되었습니다
          </span>
        )}
        {status === 'error' && (
          <span className="text-sm text-rose-400">저장 실패. 다시 시도해주세요.</span>
        )}
      </div>
    </div>
  );
}
