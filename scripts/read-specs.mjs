import ExcelJS from 'exceljs';

const wb = new ExcelJS.Workbook();
await wb.xlsx.readFile(
  'C:\\Users\\wisebirds\\Desktop\\업무\\1.키움증권\\2026년\\2606-2607_키움증권_퇴직연금 메인 이벤트 캠페인\\0.Media Mix\\Wisebirds_키움증권_퇴직연금 이벤트 캠페인_Media Mix_260515_f.xlsx'
);

const targetNames = ['구글', 'Instagram', '네이버GFA', '네이버AD', '토스 ', '애디슨오퍼월', '카카오페이', '카카오모먼트', '블라인드', '리멤버', '타불라', '토스 제작'];
const sheets = wb.worksheets.filter(s => targetNames.some(n => s.name.includes(n.trim())));

for (const sheet of sheets) {
  console.log(`\n\n${'='.repeat(60)}`);
  console.log(`시트: "${sheet.name}"`);
  console.log('='.repeat(60));
  sheet.eachRow({ includeEmpty: false }, (row, rowNum) => {
    if (rowNum > 60) return;
    const vals = [];
    row.eachCell({ includeEmpty: true }, (cell) => {
      try {
        const v = cell.text?.trim();
        if (v) vals.push(v);
      } catch {}
    });
    if (vals.length) console.log(`R${rowNum}: ${vals.join(' | ')}`);
  });
}
