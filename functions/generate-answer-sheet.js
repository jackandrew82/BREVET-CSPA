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
  
  // Calculer positions automatiquement
  function getQuestionPosition(qNum) {
    const q = parseInt(qNum);
    const spacing = 18; // Espacement entre questions (ajustable)
    
    // Colonne gauche : Q1-31
    if (q >= 1 && q <= 31) {
      return {
        x: 40,
        y: height - 100 - ((q - 1) * spacing),
        page: 0
      };
    }
    // Colonne droite : Q32-60
    else if (q >= 32 && q <= 60) {
      return {
        x: width / 2 + 20,
        y: height - 100 - ((q - 32) * spacing),
        page: 0
      };
    }
    return null;
  }
  
  // Surligner erreurs
  mistakes.forEach(mistake => {
    const pos = getQuestionPosition(mistake.question);
    if (!pos) return;
    
    const targetPage = pages[pos.page] || firstPage;
    
    // Rectangle rouge semi-transparent
    targetPage.drawRectangle({
      x: pos.x - 3,
      y: pos.y - 2,
      width: 25,
      height: 14,
      color: rgb(1, 0, 0),
      opacity: 0.4,
    });
    
    // Numero en rouge gras
    targetPage.drawText(mistake.question, {
      x: pos.x,
      y: pos.y,
      size: 10,
      font: boldFont,
      color: rgb(1, 0, 0),
    });
  });
  
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

module.exports = { generateAnswerSheetPDF };
