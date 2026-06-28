import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    if (!supabaseAdmin) return NextResponse.json({ error: 'DB not configured' }, { status: 503 })

    const formData = await req.formData()
    const file = formData.get('file') as File
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    // Resize/compress: read as buffer
    const buffer = Buffer.from(await file.arrayBuffer())
    
    // Generate unique filename
    const ext = file.name.split('.').pop() || 'jpg'
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    // Upload to Supabase Storage
    const { error } = await supabaseAdmin.storage
      .from('dish-photos')
      .upload(filename, buffer, {
        contentType: file.type || 'image/jpeg',
        upsert: false,
      })

    if (error) {
      console.error('[upload]', error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Get public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('dish-photos')
      .getPublicUrl(filename)

    return NextResponse.json({ url: publicUrl })
  } catch (e: unknown) {
    console.error('[upload]', e)
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
