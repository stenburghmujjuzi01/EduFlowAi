const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');

async function generateCertificatePdf({ name, topic, score, code, date }) {
  const qrDataUrl = await QRCode.toDataURL(`EDUFLOW-CERT:${code}`);
  const qrBuffer = Buffer.from(qrDataUrl.split(',')[1], 'base64');

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 50 });
    const chunks = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

    doc.rect(20, 20, pageWidth - 40, pageHeight - 40).lineWidth(3).stroke('#2c3e50');
    doc.rect(30, 30, pageWidth - 60, pageHeight - 60).lineWidth(1).stroke('#2c3e50');

    doc.fontSize(36).fillColor('#2c3e50')
      .text('Certificate of Completion', 0, 100, { align: 'center' });

    doc.moveDown(1.5);
    doc.fontSize(16).fillColor('#555555').text('This certifies that', { align: 'center' });

    doc.moveDown(0.5);
    doc.fontSize(30).fillColor('#000000').text(name, { align: 'center' });

    doc.moveDown(0.5);
    doc.fontSize(16).fillColor('#555555').text('has successfully completed the course', { align: 'center' });

    doc.moveDown(0.3);
    doc.fontSize(24).fillColor('#2c3e50').text(topic, { align: 'center' });

    doc.moveDown(0.8);
    doc.fontSize(14).fillColor('#555555').text(`Final Assessment Score: ${score}/10`, { align: 'center' });

    doc.moveDown(1.5);
    doc.fontSize(11).fillColor('#888888').text(`Issued: ${date}`, { align: 'center' });
    doc.fontSize(11).fillColor('#888888').text(`Certificate Code: ${code}`, { align: 'center' });
    doc.fontSize(9).fillColor('#aaaaaa').text('Verify by messaging the bot: "verify ' + code + '"', { align: 'center' });

    doc.image(qrBuffer, pageWidth - 160, pageHeight - 160, { width: 100 });

    doc.end();
  });
}

module.exports = { generateCertificatePdf };