import { NextRequest, NextResponse } from 'next/server';
import ExcelJS from 'exceljs';
import { CHANNELS } from '../../../lib/channels';
import type { Submission } from '../../../lib/types';

export async function POST(req: NextRequest) {
  const { submissions } = await req.json() as { submissions: Submission[] };

  const valueMap = new Map<string, string>();
  for (const r of submissions) {
    valueMap.set(`${r.channel_id}|${r.format_id}|${r.field_id}`, r.value);
  }

  const wb = new ExcelJS.Workbook();
  wb.creator = '키움증권 소재 제작 가이드';

  const ws = wb.addWorksheet('광고 문구');
  ws.columns = [
    { header: '매체', key: 'channel', width: 22 },
    { header: '형식', key: 'format', width: 24 },
    { header: '필드', key: 'field', width: 22 },
    { header: '내용', key: 'value', width: 50 },
    { header: '최대 글자수', key: 'limit', width: 14 },
  ];

  ws.getRow(1).eachCell((cell) => {
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1A1A1A' } };
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });
  ws.getRow(1).height = 22;

  for (const channel of CHANNELS) {
    for (const format of channel.formats) {
      for (const field of format.textFields) {
        const key = `${channel.id}|${format.id}|${field.id}`;
        const value = valueMap.get(key) ?? '';
        const row = ws.addRow({
          channel: channel.name,
          format: format.name,
          field: field.label,
          value,
          limit: `${field.maxLength}${field.unit === 'byte' ? 'byte' : '자'}`,
        });
        if (!value) {
          row.getCell('value').fill = {
            type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF9C4' },
          };
        }
      }
    }
  }

  ws.eachRow((row, i) => {
    if (i === 1) return;
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFE5E7EB' } },
        left: { style: 'thin', color: { argb: 'FFE5E7EB' } },
        bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } },
        right: { style: 'thin', color: { argb: 'FFE5E7EB' } },
      };
      cell.alignment = { vertical: 'middle', wrapText: true };
    });
    row.height = 20;
  });

  const buffer = await wb.xlsx.writeBuffer();
  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="소재_제작_가이드_문구.xlsx"',
    },
  });
}
