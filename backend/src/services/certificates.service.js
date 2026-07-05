const { supabase } = require('../config/supabase');

function generateCertificateCode() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

async function createCertificate({ user_id, name, topic, score }) {
  const certificate_code = generateCertificateCode();

  const { data, error } = await supabase
    .from('certificates')
    .insert([{ user_id, name, topic, score, certificate_code }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function getCertificateByCode(code) {
  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .eq('certificate_code', code.toUpperCase())
    .maybeSingle();

  if (error) throw error;
  return data;
}

async function getAllCertificates() {
  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .order('issued_at', { ascending: false });

  if (error) throw error;
  return data;
}

module.exports = { createCertificate, getCertificateByCode, getAllCertificates };