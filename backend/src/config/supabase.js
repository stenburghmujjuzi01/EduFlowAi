const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabase = null;

if (supabaseUrl && supabaseServiceKey) {
  // Service role key is used on the backend only - it bypasses Row Level
  // Security, so it must NEVER be exposed to the client/dashboard.
  supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
  });
} else {
  console.warn(
    '[supabase] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set yet. ' +
    'The server will still start, but any database call will fail until ' +
    'you add these to backend/.env'
  );
}

/**
 * Simple connectivity check used by the /health endpoint.
 * Returns { connected: boolean, error?: string }
 */
async function checkConnection() {
  if (!supabase) {
    return { connected: false, error: 'Supabase client not configured (missing env vars)' };
  }
  try {
    const { error } = await supabase.from('_eduflow_healthcheck').select('*').limit(1);
    // A "relation/table does not exist" error still proves the connection + auth
    // work - Postgres raises 42P01, but Supabase's PostgREST layer often
    // reports it as PGRST205 ("table not found in schema cache") instead.
    // Only treat other errors (bad URL, bad key, network) as "not connected".
    const TABLE_NOT_FOUND_CODES = ['42P01', 'PGRST205'];
    if (error && !TABLE_NOT_FOUND_CODES.includes(error.code)) {
      return { connected: false, error: error.message };
    }
    return { connected: true };
  } catch (err) {
    return { connected: false, error: err.message };
  }
}

module.exports = { supabase, checkConnection };