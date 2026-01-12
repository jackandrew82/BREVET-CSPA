const PDFDocument = require('pdfkit');

function generateErrorReportPDF(studentName, brevet, score, mistakes) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const chunks = [];

    doc.on('data', chunk => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    // En-tête
    doc.fontSize(20).text('Rapport d\'erreurs', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Étudiant : ${studentName}`);
    doc.text(`Brevet : ${brevet}`);
    doc.text(`Score : ${score}`);
    doc.moveDown();

    // Liste des erreurs
    if (mistakes.length === 0) {
      doc.fontSize(14).fillColor('green').text('Félicitations ! Aucune erreur !', { align: 'center' });
    } else {
      doc.fontSize(14).fillColor('red').text(`Erreurs (${mistakes.length}) :`, { underline: true });
      doc.moveDown(0.5);
      
      mistakes.forEach((mistake, index) => {
        doc.fontSize(11).fillColor('black');
        doc.text(`${index + 1}. Question ${mistake.question}`, { continued: false });
        doc.fontSize(10);
        doc.fillColor('red').text(`   Ta réponse : ${mistake.user_answer || '(pas de réponse)'}`, { indent: 20 });
        doc.fillColor('green').text(`   Bonne réponse : ${mistake.right_answer}`, { indent: 20 });
        doc.moveDown(0.5);
      });
    }

    doc.end();
  });
}

module.exports = { generateErrorReportPDF };
