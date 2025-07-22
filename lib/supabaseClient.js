// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// Pastikan URL diapit tanda kutip
const supabaseUrl = 'https://fjvixwrprphtmisymuvo.supabase.co'

// Pastikan kunci diapit tanda kutip
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqdml4d3JwcnBodG1pc3ltdXZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0ODE1NDEsImV4cCI6MjA2ODA1NzU0MX0.gx2bWely4zLzNoQQ5z8P_J2gFxchgxDobNSTelzXCTU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
