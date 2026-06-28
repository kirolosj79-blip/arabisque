import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

// Admin panel sends camelCase (MenuItem type) — DB columns are snake_case.
// Map one way for writes, and back the other way for reads, so the
// frontend never has to change its shape.
interface AdminMenuItem {
  id: string; name: string; nameAr: string; description: string;
  price: number; comboPrice: number | null; category: string;
  isVegetarian: boolean; isFeatured: boolean; spiceLevel: number;
  note: string; image: string; isAvailable: boolean;
}

function toDbRow(item: Partial<AdminMenuItem>) {
  const row: Record<string, unknown> = {}
  if (item.id !== undefined) row.id = item.id
  if (item.name !== undefined) row.name = item.name
  if (item.nameAr !== undefined) row.name_ar = item.nameAr
  if (item.description !== undefined) row.description = item.description
  if (item.price !== undefined) row.price = item.price
  if (item.comboPrice !== undefined) row.combo_price = item.comboPrice
  if (item.category !== undefined) row.category = item.category
  if (item.isVegetarian !== undefined) row.is_vegetarian = item.isVegetarian
  if (item.isFeatured !== undefined) row.is_featured = item.isFeatured
  if (item.spiceLevel !== undefined) row.spice_level = item.spiceLevel
  if (item.note !== undefined) row.note = item.note
  if (item.image !== undefined) row.image = item.image
  if (item.isAvailable !== undefined) row.is_available = item.isAvailable
  return row
}

function toAdminItem(row: Record<string, unknown>): AdminMenuItem {
  return {
    id: row.id as string,
    name: row.name as string,
    nameAr: (row.name_ar as string) || '',
    description: (row.description as string) || '',
    price: Number(row.price) || 0,
    comboPrice: row.combo_price !== null && row.combo_price !== undefined ? Number(row.combo_price) : null,
    category: row.category as string,
    isVegetarian: Boolean(row.is_vegetarian),
    isFeatured: Boolean(row.is_featured),
    spiceLevel: Number(row.spice_level) || 0,
    note: (row.note as string) || '',
    image: (row.image as string) || '',
    isAvailable: row.is_available !== false,
  }
}

export async function GET() {
  try {
    if (!supabaseAdmin) return NextResponse.json({ items: [] })
    const { data, error } = await supabaseAdmin.from('menu_items_custom').select('*')
    if (error) { console.error('[menu-items GET]', error.message); return NextResponse.json({ items: [] }) }
    return NextResponse.json(
      { items: (data || []).map(toAdminItem) },
      { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
    )
  } catch (e) { console.error('[menu-items GET]', e); return NextResponse.json({ items: [] }) }
}

export async function POST(req: NextRequest) {
  try {
    if (!supabaseAdmin) return NextResponse.json({ error: 'DB not configured' }, { status: 503 })
    const body = await req.json()
    const row = toDbRow(body)
    const { error } = await supabaseAdmin.from('menu_items_custom').upsert(row, { onConflict: 'id' })
    if (error) { console.error('[menu-items POST]', error.message, row); return NextResponse.json({ error: error.message }, { status: 500 }) }
    return NextResponse.json({ success: true })
  } catch (e: unknown) { console.error('[menu-items POST]', e); return NextResponse.json({ error: String(e) }, { status: 500 }) }
}

export async function DELETE(req: NextRequest) {
  try {
    if (!supabaseAdmin) return NextResponse.json({ error: 'DB not configured' }, { status: 503 })
    const { id } = await req.json()
    const { error } = await supabaseAdmin.from('menu_items_custom').delete().eq('id', id)
    if (error) { console.error('[menu-items DELETE]', error.message); return NextResponse.json({ error: error.message }, { status: 500 }) }
    return NextResponse.json({ success: true })
  } catch (e: unknown) { console.error('[menu-items DELETE]', e); return NextResponse.json({ error: String(e) }, { status: 500 }) }
}
