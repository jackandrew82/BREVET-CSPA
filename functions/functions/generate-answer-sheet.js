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
  
  // Map des erreurs
  const errorsMap = {};
  mistakes.forEach(m => {
    errorsMap[m.question] = true;
  });
  
  // Positions approximatives des cases reponses (a ajuster)
  function getAnswerPosition(qNum) {
    const q = parseInt(qNum);
    const spacing = 18;
    
    // Colonne gauche Q1-31
    if (q >= 1 && q <= 31) {
      return { x: 65, y: height - 100 - ((q - 1) * spacing), page: 0 };
    }
    // Colonne droite Q32-60
    else if (q >= 32 && q <= 60) {
      return { x: width / 2 + 45, y: height - 100 - ((q - 32) * spacing), page: 0 };
    }
    return null;
  }
  
  // Afficher toutes les reponses
  for (const [qNum, answer] of Object.entries(allAnswers)) {
    if (!answer || answer === '') continue;
    
    const pos = getAnswerPosition(qNum);
    if (!pos) continue;
    
    const targetPage = pages[pos.page] || firstPage;
    const isError = errorsMap[qNum];
    
    // Couleur : rouge si erreur, noir si bon
    const color = isError ? rgb(1, 0, 0) : rgb(0, 0, 0);
    
    // Ecrire la reponse
    targetPage.drawText(answer, {
      x: pos.x,
      y: pos.y,
      size: 11,
      font: boldFont,
      color: color,
    });
  }
  
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

module.exports = { generateAnswerSheetPDF };
