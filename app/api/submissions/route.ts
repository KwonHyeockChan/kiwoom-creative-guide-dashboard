import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function POST(req: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  }

  const body = await req.json() as {
    channel_id: string;
    format_id: string;
    fields: Record<string, string>;
  };

  const rows = Object.entries(body.fields)
    .filter(([, v]) => v.trim() !== '')
    .map(([field_id, value]) => ({
      channel_id: body.channel_id,
      format_id: body.format_id,
      field_id,
      value,
    }));

  if (!rows.length) {
    return NextResponse.json({ ok: true });
  }

  const { error } = await supabase
    .from('submissions')
    .upsert(rows, { onConflict: 'channel_id,format_id,field_id' });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  if (!supabase) {
    return NextResponse.json([]);
  }

  const { data, error } = await supabase
    .from('submissions')
    .select('channel_id, format_id, field_id, value')
    .order('channel_id')
    .order('format_id')
    .order('field_id');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}
