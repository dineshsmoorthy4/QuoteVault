// import { createClient } from '@supabase/supabase-js';
// // import { SUPABASE_URL, SUPABASE_ANON_KEY } from 'react-native-dotenv';

// const SUPABASE_URL = 'https://ylflvyoysjfnzkyuzhza.supabase.co';
// const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsZmx2eW95c2pmbnpreXV6aHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyODgwMjQsImV4cCI6MjA4Mzg2NDAyNH0.sTWHFsc8zsQ-188gvIKqI8hYM7RkG9JErvSF3Yv0qUw';
// const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsZmx2eW95c2pmbnpreXV6aHphIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODI4ODAyNCwiZXhwIjoyMDgzODY0MDI0fQ.UkffXL2_Ujuab_x5KHc13ytfcvs2xm0T0UFkS-M-Qp4'

// if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
//   throw new Error('Missing Supabase environment variables');
// }

// export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient, processLock } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ylflvyoysjfnzkyuzhza.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsZmx2eW95c2pmbnpreXV6aHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyODgwMjQsImV4cCI6MjA4Mzg2NDAyNH0.sTWHFsc8zsQ-188gvIKqI8hYM7RkG9JErvSF3Yv0qUw';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsZmx2eW95c2pmbnpreXV6aHphIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODI4ODAyNCwiZXhwIjoyMDgzODY0MDI0fQ.UkffXL2_Ujuab_x5KHc13ytfcvs2xm0T0UFkS-M-Qp4'

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      lock: processLock,
    },
  })
        