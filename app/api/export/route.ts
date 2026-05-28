import { NextResponse } from 'next/server';
import ExcelJS from 'exceljs';
import { CHANNELS, getChannel } from '../../../lib/channels';
import { supabase } from '../../../lib/supabase';

interface Row {
  channel_id: string;
  format_id: string;
  field_id: string;
  value: string;
}

export async function GET() {
  let rows: Row[] = [];

  if (supabase) {
    const { data } = await supabase
      .from('submissions')
      .select('channel_id, format_id, field_id, value')
      .order('channel_id')
      .order('format_id')
      .order('field_id');
    rows = (data as Row[]) ?? [];
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

  // Style header row
  ws.getRow(1).eachCell((cell) => {
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1A1A1A' } };
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });
  ws.getRow(1).height = 22;

  if (rows.length === 0) {
    // Add placeholder rows for all channels
    for (const channel of CHANNELS) {
      for (const format of channel.formats) {
        for (const field of format.textFields) {
          const row = ws.addRow({
            channel: channel.name,
            format: format.name,
            field: field.label,
            value: '',
            limit: `${field.maxLength}${field.unit === 'byte' ? 'byte' : '자'}`,
          });
          row.getCell('value').fill = {
            type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF9C4' },
          };
        }
      }
    }
  } else {
    // Merge saved values
    const valueMap = new Map<string, string>();
    for (const r of rows) {
      valueMap.set(`${r.channel_id}|${r.format_id}|${r.field_id}`, r.value);
    }

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
  }

  // Borders
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
      'Content-Disposition': 'attachment; filename="creative-guide.xlsx"',
    },
  });
}
