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
  
  // Si erreurs, grand encadre rouge en haut
  if (mistakes.length > 0) {
    // Rectangle rouge
    firstPage.drawRectangle({
      x: 40,
      y: height - 150,
      width: width - 80,
      height: 90,
      color: rgb(1, 0.95, 0.95),
      borderColor: rgb(1, 0, 0),
      borderWidth: 3,
    });
    
    // Titre
    firstPage.drawText('QUESTIONS A CORRIGER:', {
      x: 50,
      y: height - 70,
      size: 14,
      font: boldFont,
      color: rgb(0.8, 0, 0),
    });
    
    // Liste des numeros de questions erronees
    const errorNumbers = mistakes.map(m => {
      const userAns = m.user_answer || 'X';
      return 'Q' + m.question + '[' + userAns + ']';
    });
    
    // Afficher en plusieurs lignes si necessaire
    let currentLine = '';
    let lineY = height - 95;
    
    errorNumbers.forEach((item, index) => {
      const testLine = currentLine + item + '  ';
      if (font.widthOfTextAtSize(testLine, 11) > width - 120) {
        firstPage.drawText(currentLine, {
          x: 50,
          y: lineY,
          size: 11,
          font: boldFont,
          color: rgb(0.8, 0, 0),
        });
        currentLine = item + '  ';
        lineY -= 18;
      } else {
        currentLine = testLine;
      }
    });
    
    if (currentLine) {
      firstPage.drawText(currentLine, {
        x: 50,
        y: lineY,
        size: 11,
        font: boldFont,
        color: rgb(0.8, 0, 0),
      });
    }
    
    // Note
    firstPage.drawText('(Voir rapport detaille PDF joint)', {
      x: 50,
      y: height - 145,
      size: 8,
      font,
      color: rgb(0.5, 0, 0),
    });
  }
  
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

module.exports = { generateAnswerSheetPDF };
