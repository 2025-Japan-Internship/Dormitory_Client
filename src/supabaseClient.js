// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// .env 파일에서 변수 불러오기 (CRA 전용)
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
