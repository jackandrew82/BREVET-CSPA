const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

async function generateErrorReportPDF(studentName, brevet, score, mistakes) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // Format A4
  const { width, height } = page.getSize();
  
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let y = height - 50;

  // Titre
  page.drawText('Rapport d\'erreurs', {
    x: 50,
    y: y,
    size: 20,
    font: boldFont,
    color: rgb(0, 0, 0),
  });

  y -= 40;

  // Info étudiant
  page.drawText(`Étudiant : ${studentName}`, { x: 50, y: y, size: 12, font });
  y -= 20;
  page.drawText(`Brevet : ${brevet}`, { x: 50, y: y, size: 12, font });
  y -= 20;
  page.drawText(`Score : ${score}`, { x: 50, y: y, size: 12, font });
  y -= 30;

  // Liste des erreurs
  if (mistakes.length === 0) {
    page.drawText('Félicitations ! Aucune erreur !', {
      x: 50,
      y: y,
      size: 14,
      font: boldFont,
      color: rgb(0, 0.5, 0),
    });
  } else {
    page.drawText(`Erreurs (${mistakes.length}) :`, {
      x: 50,
      y: y,
      size: 14,
      font: boldFont,
      color: rgb(0.8, 0, 0),
    });
    y -= 25;

    for (let i = 0; i < mistakes.length && y > 50; i++) {
      const mistake = mistakes[i];
      
      page.drawText(`${i + 1}. Question ${mistake.question}`, {
        x: 50,
        y: y,
        size: 11,
        font: boldFont,
      });
      y -= 15;

      const userAnswer = mistake.user_answer || '(pas de réponse)';
      page.drawText(`   Ta réponse : ${userAnswer}`, {
        x: 70,
        y: y,
        size: 10,
        font,
        color: rgb(0.8, 0, 0),
      });
      y -= 15;

      page.drawText(`   Bonne réponse : ${mistake.right_answer}`, {
        x: 70,
        y: y,
        size: 10,
        font,
        color: rgb(0, 0.5, 0),
      });
      y -= 20;

      // Nouvelle page si nécessaire
      if (y < 100 && i < mistakes.length - 1) {
        const newPage = pdfDoc.addPage([595, 842]);
        y = height - 50;
      }
    }
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

module.exports = { generateErrorReportPDF };
