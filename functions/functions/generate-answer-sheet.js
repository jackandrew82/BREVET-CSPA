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
  
  // Map des erreurs pour savoir lesquelles colorer en rouge
  const errorsMap = {};
  mistakes.forEach(m => {
    errorsMap[m.question] = true;
  });
  
  // Calculer positions
  function getQuestionPosition(qNum) {
    const q = parseInt(qNum);
    const spacing = 18;
    
    if (q >= 1 && q <= 31) {
      return { x: 40, y: height - 100 - ((q - 1) * spacing), page: 0 };
    }
    else if (q >= 32 && q <= 60) {
      return { x: width / 2 + 20, y: height - 100 - ((q - 32) * spacing), page: 0 };
    }
    return null;
  }
  
  // Afficher TOUTES les reponses du participant
  for (const [qNum, answer] of Object.entries(allAnswers)) {
    if (!answer || answer === '') continue; // Skip si pas de reponse
    
    const pos = getQuestionPosition(qNum);
    if (!pos) continue;
    
    const targetPage = pages[pos.page] || firstPage;
    const isError = errorsMap[qNum];
    const color = isError ? rgb(1, 0, 0) : rgb(0, 0.5, 0); // Rouge si erreur, vert si bon
    
    // Surligner si erreur
    if (isError) {
      targetPage.drawRectangle({
        x: pos.x - 3,
        y: pos.y - 2,
        width: 25,
        height: 14,
        color: rgb(1, 0, 0),
        opacity: 0.3,
      });
    }
    
    // Afficher reponse a cote du numero
    targetPage.drawText('[' + answer + ']', {
      x: pos.x + 22,
      y: pos.y,
      size: 9,
      font: boldFont,
      color: color,
    });
  }
  
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

module.exports = { generateAnswerSheetPDF };
