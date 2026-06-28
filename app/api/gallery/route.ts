import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export async function GET() {
  try {
    if (!supabaseAdmin) return NextResponse.json({ images: [] })
    const { data, error } = await supabaseAdmin
      .from('gallery_images')
      .select('*')
      .order('display_order', { ascending: true })
    if (error) return NextResponse.json({ images: [] })
    return NextResponse.json({ images: data || [] })
  } catch { return NextResponse.json({ images: [] }) }
}

export async function POST(req: NextRequest) {
  try {
    if (!supabaseAdmin) return NextResponse.json({ error: 'DB not configured' }, { status: 503 })
    const body = await req.json()
    const { error, data } = await supabaseAdmin
      .from('gallery_images')
      .insert({ src: body.src, alt: body.alt || '', caption: body.caption || '', display_order: body.display_order || 0, is_default: body.is_default || false })
      .select()
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true, image: data })
  } catch (e: unknown) { return NextResponse.json({ error: String(e) }, { status: 500 }) }
}

export async function PATCH(req: NextRequest) {
  try {
    if (!supabaseAdmin) return NextResponse.json({ error: 'DB not configured' }, { status: 503 })
    const body = await req.json()
    const { id, ...updates } = body
    const { error } = await supabaseAdmin.from('gallery_images').update(updates).eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (e: unknown) { return NextResponse.json({ error: String(e) }, { status: 500 }) }
}

export async function DELETE(req: NextRequest) {
  try {
    if (!supabaseAdmin) return NextResponse.json({ error: 'DB not configured' }, { status: 503 })
    const { id } = await req.json()
    const { error } = await supabaseAdmin.from('gallery_images').delete().eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (e: unknown) { return NextResponse.json({ error: String(e) }, { status: 500 }) }
}
