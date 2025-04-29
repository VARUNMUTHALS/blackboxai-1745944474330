import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function getAnimationUrl(word) {
  const { data, error } = await supabase
    .from('signs')
    .select('animation_url')
    .eq('word', word)
    .single()

  if (error || !data) {
    return null
  }
  return data.animation_url
}
