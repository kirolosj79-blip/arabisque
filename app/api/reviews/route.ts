import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export async function GET() {
  try {
    if (!supabaseAdmin) return NextResponse.json({ reviews: [] })
    const { data, error } = await supabaseAdmin.from('reviews').select('*').order('created_at', { ascending: false })
    if (error) return NextResponse.json({ reviews: [] })
    return NextResponse.json({ reviews: data || [] })
  } catch { return NextResponse.json({ reviews: [] }) }
}
export async function POST(req: NextRequest) {
  try {
    if (!supabaseAdmin) return NextResponse.json({ error: 'DB not configured' }, { status: 503 })
    const { name, rating, text } = await req.json()
    if (!name?.trim() || !text?.trim() || !rating) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    const { data, error } = await supabaseAdmin.from('reviews').insert({ name, rating, text, approved: false, featured: false }).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true, review: data })
  } catch (e: unknown) { return NextResponse.json({ error: String(e) }, { status: 500 }) }
}
export async function PATCH(req: NextRequest) {
  try {
    if (!supabaseAdmin) return NextResponse.json({ error: 'DB not configured' }, { status: 503 })
    const { id, approved, featured } = await req.json()
    const updates: Record<string, boolean> = {}
    if (approved !== undefined) updates.approved = approved
    if (featured !== undefined) updates.featured = featured
    const { error } = await supabaseAdmin.from('reviews').update(updates).eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (e: unknown) { return NextResponse.json({ error: String(e) }, { status: 500 }) }
}
export async function DELETE(req: NextRequest) {
  try {
    if (!supabaseAdmin) return NextResponse.json({ error: 'DB not configured' }, { status: 503 })
    const { id } = await req.json()
    const { error } = await supabaseAdmin.from('reviews').delete().eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (e: unknown) { return NextResponse.json({ error: String(e) }, { status: 500 }) }
}
