const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');
const { ANSWER_POSITIONS } = require('./answer-positions');

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
  
  const positions = ANSWER_POSITIONS[brevet] || {};
  
  // Marquer SEULEMENT les erreurs en rouge
  mistakes.forEach(mistake => {
    const qNum = mistake.question;
    const userAnswer = mistake.user_answer;
    
    if (positions[qNum]) {
      const pos = positions[qNum];
      const targetPage = pages[pos.page] || firstPage;
      
      // Cercle rouge autour numero question
      targetPage.drawCircle({
        x: pos.x,
        y: pos.y,
        size: 12,
        borderColor: rgb(1, 0, 0),
        borderWidth: 2.5,
      });
      
      // Reponse incorrecte a cote
      if (userAnswer) {
        targetPage.drawText('[' + userAnswer + ']', {
          x: pos.x + 20,
          y: pos.y - 4,
          size: 10,
          font: boldFont,
          color: rgb(1, 0, 0),
        });
      }
    }
  });
  
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

module.exports = { generateAnswerSheetPDF };
