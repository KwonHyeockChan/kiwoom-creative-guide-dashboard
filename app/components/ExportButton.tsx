'use client';

import { useState } from 'react';
import { CHANNELS } from '../../lib/channels';

function localKey(channelId: string, formatId: string, fieldId: string) {
  return `creative-guide:${channelId}:${formatId}:${fieldId}`;
}

export function ExportButton() {
  const [loading, setLoading] = useState(false);

  async function handleExport() {
    setLoading(true);
    try {
      const submissions = CHANNELS.flatMap((channel) =>
        channel.formats.flatMap((format) =>
          format.textFields.map((field) => ({
            channel_id: channel.id,
            format_id: format.id,
            field_id: field.id,
            value: localStorage.getItem(localKey(channel.id, format.id, field.id)) ?? '',
          }))
        )
      );

      const res = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submissions }),
      });
      if (!res.ok) throw new Error('export failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = '소재_제작_가이드_문구.xlsx';
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert('다운로드 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className="flex items-center gap-2 rounded-lg border border-violet-500/60 bg-violet-600/20 px-4 py-2 text-sm font-semibold text-violet-300 transition hover:bg-violet-600/30 disabled:opacity-60"
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-violet-300 border-t-transparent" />
      ) : (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      )}
      엑셀 다운로드
    </button>
  );
}
