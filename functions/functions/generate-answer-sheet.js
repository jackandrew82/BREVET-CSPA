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
    y: height - 30,
    size: 12,
    font: boldFont,
    color: rgb(0, 0, 0),
  });
  
  // Map des erreurs
  const errorsMap = {};
  mistakes.forEach(m => {
    errorsMap[m.question] = true;
  });
  
  // Positions ajustees pour lignes reponses
  function getAnswerPosition(qNum) {
    const q = parseInt(qNum);
    const lineHeight = 18.5; // Ajuster selon espacement reel
    const startY = 747; // Position premiere ligne (ajustable)
    
    // Colonne gauche Q1-31
    if (q >= 1 && q <= 31) {
      return { 
        x: 80,  // Position sur la ligne (apres numero)
        y: startY - ((q - 1) * lineHeight), 
        page: 0 
      };
    }
    // Colonne droite Q32-60  
    else if (q >= 32 && q <= 60) {
      return { 
        x: width / 2 + 65, 
        y: startY - ((q - 32) * lineHeight), 
        page: 0 
      };
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
    
    // Ecrire la reponse sur la ligne
    targetPage.drawText(answer.toUpperCase(), {
      x: pos.x,
      y: pos.y,
      size: 10,
      font: boldFont,
      color: color,
    });
  }
  
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

module.exports = { generateAnswerSheetPDF };
