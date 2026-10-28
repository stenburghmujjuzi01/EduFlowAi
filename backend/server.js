require('dotenv').config();

if (process.env.NODE_ENV === 'development') {
  const hasSupabaseUrl = Boolean(process.env.SUPABASE_URL?.trim());
  const hasSupabaseServiceKey = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY?.trim());

  if (hasSupabaseUrl !== hasSupabaseServiceKey) {
    const missing = hasSupabaseUrl ? 'SUPABASE_SERVICE_ROLE_KEY' : 'SUPABASE_URL';
    throw new Error(
      `[startup] Incomplete Supabase configuration: ${missing} is missing. ` +
      'Set both Supabase variables, or leave both empty for local development.'
    );
  }
}

const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`EduFlow Ai API is running on port ${PORT}`);
  console.log(`-> http://localhost:${PORT}`);
  console.log(`-> http://localhost:${PORT}/health`);
});