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
  
  // Positions approximatives (colonnes gauche et droite)
  const leftColumn = { x: 20, startY: 750 };
  const rightColumn = { x: 320, startY: 750 };
  
  // Surligner chaque question erronee
  mistakes.forEach(mistake => {
    const qNum = parseInt(mistake.question);
    let x, y, page = 0;
    
    // Logique simple de positionnement
    if (qNum <= 23) {
      // Page 1, colonne gauche
      x = leftColumn.x;
      y = leftColumn.startY - ((qNum - 1) * 25);
      page = 0;
    } else if (qNum <= 46) {
      // Page 1, colonne droite
      x = rightColumn.x;
      y = rightColumn.startY - ((qNum - 24) * 25);
      page = 0;
    } else {
      // Page 1, colonne droite (suite)
      x = rightColumn.x;
      y = rightColumn.startY - ((qNum - 47) * 25);
      page = 0;
    }
    
    const targetPage = pages[page] || firstPage;
    
    // Rectangle rouge semi-transparent (surlignage)
    targetPage.drawRectangle({
      x: x - 5,
      y: y - 3,
      width: 35,
      height: 16,
      color: rgb(1, 0, 0),
      opacity: 0.3,
    });
    
    // Texte rouge gras
    targetPage.drawText('Q' + mistake.question, {
      x: x,
      y: y,
      size: 11,
      font: boldFont,
      color: rgb(1, 0, 0),
    });
  });
  
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

module.exports = { generateAnswerSheetPDF };
