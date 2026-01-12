const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');

async function generateAnswerSheetPDF(studentName, brevet, mistakes, allAnswers) {
  const templatePath = path.join(__dirname, brevet + '-FEUILLE-REPONSE.pdf');
  const templateBytes = await fs.readFile(templatePath);
  
  const pdfDoc = await PDFDocument.load(templateBytes);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();
  
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  // Nom
  firstPage.drawText('Nom: ' + studentName, {
    x: width - 200,
    y: height - 30,
    size: 12,
    font: boldFont,
    color: rgb(0, 0, 0),
  });
  
  // TEST Q2 avec nouvelles coordonnees
  if (allAnswers['q2']) {
    firstPage.drawText('Q2: ' + allAnswers['q2'], {
      x: 62,  // 90 - 28 (1 cm gauche)
      y: 640, // 725 - 85 (3 cm bas)
      size: 11,
      font: boldFont,
      color: rgb(1, 0, 0),
    });
  }
  
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

module.exports = { generateAnswerSheetPDF };
