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
    x: width - 250,
    y: height - 30,
    size: 11,
    font: boldFont,
    color: rgb(0, 0, 0),
  });
  
  const positions = ANSWER_POSITIONS[brevet] || {};
  
  // Marquer TOUTES les reponses (bonnes en vert, mauvaises en rouge)
  const mistakesMap = {};
  mistakes.forEach(m => {
    mistakesMap[m.question] = {
      user: m.user_answer,
      correct: m.right_answer
    };
  });
  
  // Pour chaque question repondue
  for (const [qNum, userAnswer] of Object.entries(allAnswers)) {
    if (!userAnswer || userAnswer === '') continue;
    
    const isMistake = mistakesMap[qNum];
    const color = isMistake ? rgb(1, 0, 0) : rgb(0, 0.6, 0); // Rouge si erreur, vert si bon
    
    if (positions[qNum]) {
      const pos = positions[qNum];
      const targetPage = pages[pos.page] || firstPage;
      
      // Cercle autour numero question
      targetPage.drawCircle({
        x: pos.x,
        y: pos.y,
        size: 12,
        borderColor: color,
        borderWidth: 2.5,
      });
      
      // Afficher la reponse cochee a cote
      targetPage.drawText('[' + userAnswer + ']', {
        x: pos.x + 20,
        y: pos.y - 4,
        size: 10,
        font: boldFont,
        color: color,
      });
    }
  }
  
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

module.exports = { generateAnswerSheetPDF };
