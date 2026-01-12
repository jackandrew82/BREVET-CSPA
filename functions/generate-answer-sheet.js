const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');
const { ANSWER_POSITIONS } = require('./answer-positions');

async function generateAnswerSheetPDF(studentName, brevet, mistakes) {
  const templatePath = path.join(__dirname, brevet + '-FEUILLE-REPONSE.pdf');
  const templateBytes = await fs.readFile(templatePath);
  
  const pdfDoc = await PDFDocument.load(templateBytes);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();
  
  // Ajouter nom etudiant en haut a droite
  firstPage.drawText('Nom: ' + studentName, {
    x: width - 250,
    y: height - 30,
    size: 11,
    color: rgb(0, 0, 0),
  });
  
  // Cercles rouges sur numeros questions erronees
  const positions = ANSWER_POSITIONS[brevet] || {};
  
  mistakes.forEach(mistake => {
    const qNum = mistake.question;
    
    if (positions[qNum]) {
      const pos = positions[qNum];
      const targetPage = pages[pos.page] || firstPage;
      
      // Cercle rouge autour numero question
      targetPage.drawCircle({
        x: pos.x,
        y: pos.y,
        size: 12,
        borderColor: rgb(1, 0, 0),
        borderWidth: 2,
      });
    }
  });
  
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

module.exports = { generateAnswerSheetPDF };
