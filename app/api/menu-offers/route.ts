import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export async function GET() {
  try {
    if (!supabaseAdmin) return NextResponse.json({ offers: [] })
    const { data, error } = await supabaseAdmin.from('menu_offers').select('*').order('created_at', { ascending: false })
    if (error) return NextResponse.json({ offers: [] })
    return NextResponse.json({ offers: data || [] })
  } catch { return NextResponse.json({ offers: [] }) }
}
export async function POST(req: NextRequest) {
  try {
    if (!supabaseAdmin) return NextResponse.json({ error: 'DB not configured' }, { status: 503 })
    const body = await req.json()
    const { data, error } = await supabaseAdmin.from('menu_offers').insert(body).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true, offer: data })
  } catch (e: unknown) { return NextResponse.json({ error: String(e) }, { status: 500 }) }
}
export async function PATCH(req: NextRequest) {
  try {
    if (!supabaseAdmin) return NextResponse.json({ error: 'DB not configured' }, { status: 503 })
    const { id, ...updates } = await req.json()
    const { error } = await supabaseAdmin.from('menu_offers').update(updates).eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (e: unknown) { return NextResponse.json({ error: String(e) }, { status: 500 }) }
}
export async function DELETE(req: NextRequest) {
  try {
    if (!supabaseAdmin) return NextResponse.json({ error: 'DB not configured' }, { status: 503 })
    const { id } = await req.json()
    const { error } = await supabaseAdmin.from('menu_offers').delete().eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (e: unknown) { return NextResponse.json({ error: String(e) }, { status: 500 }) }
}
