// WhatsApp Cloud API integration.
// Docs: https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const GRAPH_API_VERSION = 'v20.0';

function isConfigured() {
  return Boolean(WHATSAPP_TOKEN && WHATSAPP_PHONE_NUMBER_ID);
}

async function sendTextMessage(to, body) {
  if (!isConfigured()) {
    throw new Error('WhatsApp is not configured (missing WHATSAPP_TOKEN or WHATSAPP_PHONE_NUMBER_ID)');
  }

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body },
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const err = new Error(data.error?.message || 'WhatsApp API request failed');
    err.details = data;
    throw err;
  }

  return data;
}

async function uploadMedia(buffer, filename, mimeType) {
  if (!isConfigured()) {
    throw new Error('WhatsApp is not configured (missing WHATSAPP_TOKEN or WHATSAPP_PHONE_NUMBER_ID)');
  }

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/media`;

  const form = new FormData();
  form.append('messaging_product', 'whatsapp');
  form.append('file', new Blob([buffer], { type: mimeType }), filename);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
    },
    body: form,
  });

  const data = await response.json();

  if (!response.ok) {
    const err = new Error(data.error?.message || 'WhatsApp media upload failed');
    err.details = data;
    throw err;
  }

  return data.id;
}

async function sendDocumentMessage(to, mediaId, filename, caption) {
  if (!isConfigured()) {
    throw new Error('WhatsApp is not configured (missing WHATSAPP_TOKEN or WHATSAPP_PHONE_NUMBER_ID)');
  }

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'document',
      document: { id: mediaId, filename, caption },
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const err = new Error(data.error?.message || 'WhatsApp document send failed');
    err.details = data;
    throw err;
  }

  return data;
}

/**
 * Sends an interactive List Message - a "Menu" button that opens a popup
 * of up to 10 tappable options. Tapping one sends its `id` back to our
 * webhook as an interactive reply, which we treat like typed text.
 */
async function sendListMessage(to, bodyText, buttonLabel, rows) {
  if (!isConfigured()) {
    throw new Error('WhatsApp is not configured (missing WHATSAPP_TOKEN or WHATSAPP_PHONE_NUMBER_ID)');
  }

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'interactive',
      interactive: {
        type: 'list',
        body: { text: bodyText },
        action: {
          button: buttonLabel,
          sections: [{ title: 'Options', rows }],
        },
      },
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const err = new Error(data.error?.message || 'WhatsApp list message failed');
    err.details = data;
    throw err;
  }

  return data;
}

module.exports = { sendTextMessage, uploadMedia, sendDocumentMessage, sendListMessage, isConfigured };