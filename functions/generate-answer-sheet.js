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
  
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  // Nom etudiant en haut a droite
  firstPage.drawText('Nom: ' + studentName, {
    x: width - 200,
    y: height - 40,
    size: 12,
    font: boldFont,
    color: rgb(0, 0, 0),
  });
  
  // CERCLE DE TEST pour debug - position fixe
  firstPage.drawCircle({
    x: 100,
    y: 700,
    size: 15,
    borderColor: rgb(1, 0, 0),
    borderWidth: 3,
  });
  
  firstPage.drawText('[TEST]', {
    x: 120,
    y: 696,
    size: 10,
    font: boldFont,
    color: rgb(1, 0, 0),
  });
  
  // Afficher nombre erreurs pour debug
  if (mistakes.length > 0) {
    firstPage.drawText(mistakes.length + ' erreurs detectees', {
      x: 50,
      y: 650,
      size: 10,
      font,
      color: rgb(1, 0, 0),
    });
  }
  
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

module.exports = { generateAnswerSheetPDF };
