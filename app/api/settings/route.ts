import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export async function GET() {
  try {
    if (!supabaseAdmin) return NextResponse.json({})
    const { data, error } = await supabaseAdmin.from('settings').select('*')
    if (error) return NextResponse.json({})
    const out: Record<string, string> = {}
    data?.forEach((r: {key:string;value:string}) => { out[r.key] = r.value })
    return NextResponse.json(out)
  } catch { return NextResponse.json({}) }
}

export async function POST(req: NextRequest) {
  try {
    if (!supabaseAdmin) return NextResponse.json({ error: 'DB not configured' }, { status: 503 })
    const body = await req.json()
    for (const [key, value] of Object.entries(body)) {
      await supabaseAdmin.from('settings').upsert({ key, value: String(value) }, { onConflict: 'key' })
    }
    return NextResponse.json({ success: true })
  } catch (e: unknown) { return NextResponse.json({ error: String(e) }, { status: 500 }) }
}
