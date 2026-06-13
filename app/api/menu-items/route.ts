import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export async function GET() {
  try {
    if (!supabaseAdmin) return NextResponse.json({ items: [] })
    const { data, error } = await supabaseAdmin.from('menu_items_custom').select('*')
    if (error) return NextResponse.json({ items: [] })
    return NextResponse.json({ items: data || [] })
  } catch { return NextResponse.json({ items: [] }) }
}
export async function POST(req: NextRequest) {
  try {
    if (!supabaseAdmin) return NextResponse.json({ error: 'DB not configured' }, { status: 503 })
    const body = await req.json()
    const { error } = await supabaseAdmin.from('menu_items_custom').upsert(body, { onConflict: 'id' })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (e: unknown) { return NextResponse.json({ error: String(e) }, { status: 500 }) }
}
export async function DELETE(req: NextRequest) {
  try {
    if (!supabaseAdmin) return NextResponse.json({ error: 'DB not configured' }, { status: 503 })
    const { id } = await req.json()
    const { error } = await supabaseAdmin.from('menu_items_custom').delete().eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (e: unknown) { return NextResponse.json({ error: String(e) }, { status: 500 }) }
}
