'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';
import { CHANNELS } from '../../lib/channels';

function localKey(channelId: string, formatId: string, fieldId: string) {
  return `creative-guide:${channelId}:${formatId}:${fieldId}`;
}

export function ExportButton() {
  const [loading, setLoading] = useState(false);

  function handleExport() {
    setLoading(true);
    try {
      const wb = XLSX.utils.book_new();

      for (const channel of CHANNELS) {
        const rows: (string | number)[][] = [
          ['형식', '필드', '내용', '최대 글자수'],
        ];

        for (const format of channel.formats) {
          for (const field of format.textFields) {
            const value = localStorage.getItem(localKey(channel.id, format.id, field.id)) ?? '';
            rows.push([
              format.name,
              field.label,
              value,
              `${field.maxLength}${field.unit === 'byte' ? 'byte' : '자'}`,
            ]);
          }
        }

        if (rows.length === 1) continue; // 텍스트 필드 없는 채널은 시트 생성 안 함

        const ws = XLSX.utils.aoa_to_sheet(rows);
        ws['!cols'] = [{ wch: 26 }, { wch: 24 }, { wch: 52 }, { wch: 14 }];

        // 시트 이름은 31자 이하여야 함 (Excel 제한)
        const sheetName = channel.name.slice(0, 31);
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
      }

      const wbout = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
      const blob = new Blob([wbout], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
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
