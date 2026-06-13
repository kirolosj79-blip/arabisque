import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export async function GET() {
  try {
    if (!supabaseAdmin) return NextResponse.json({ links: [] })
    const { data, error } = await supabaseAdmin.from('order_links').select('*').order('display_order')
    if (error) return NextResponse.json({ links: [] })
    return NextResponse.json({ links: data || [] })
  } catch { return NextResponse.json({ links: [] }) }
}
export async function POST(req: NextRequest) {
  try {
    if (!supabaseAdmin) return NextResponse.json({ error: 'DB not configured' }, { status: 503 })
    const { label, url, description, is_primary, is_active } = await req.json()
    const { data, error } = await supabaseAdmin.from('order_links').insert({ label, url, description, is_primary, is_active }).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true, link: data })
  } catch (e: unknown) { return NextResponse.json({ error: String(e) }, { status: 500 }) }
}
export async function PATCH(req: NextRequest) {
  try {
    if (!supabaseAdmin) return NextResponse.json({ error: 'DB not configured' }, { status: 503 })
    const { id, ...updates } = await req.json()
    const { error } = await supabaseAdmin.from('order_links').update(updates).eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (e: unknown) { return NextResponse.json({ error: String(e) }, { status: 500 }) }
}
export async function DELETE(req: NextRequest) {
  try {
    if (!supabaseAdmin) return NextResponse.json({ error: 'DB not configured' }, { status: 503 })
    const { id } = await req.json()
    const { error } = await supabaseAdmin.from('order_links').delete().eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (e: unknown) { return NextResponse.json({ error: String(e) }, { status: 500 }) }
}
