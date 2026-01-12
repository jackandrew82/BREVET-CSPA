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
  
  // GRILLE DE CALIBRATION
  const gridSize = 20; // Espacement grille (pixels)
  const cols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  // Lignes horizontales avec numeros
  for (let i = 0; i <= 40; i++) {
    const y = height - (i * gridSize);
    
    // Ligne grise
    firstPage.drawLine({
      start: { x: 0, y: y },
      end: { x: width, y: y },
      thickness: 0.3,
      color: rgb(0.7, 0.7, 0.7),
    });
    
    // Numero ligne
    if (i % 2 === 0) {
      firstPage.drawText('' + i, {
        x: 5,
        y: y - 5,
        size: 7,
        font,
        color: rgb(0, 0, 1),
      });
    }
  }
  
  // Colonnes verticales avec lettres
  for (let i = 0; i < 25; i++) {
    const x = i * gridSize;
    
    // Ligne grise
    firstPage.drawLine({
      start: { x: x, y: 0 },
      end: { x: x, y: height },
      thickness: 0.3,
      color: rgb(0.7, 0.7, 0.7),
    });
    
    // Lettre colonne
    if (i < cols.length) {
      firstPage.drawText(cols[i], {
        x: x + 5,
        y: height - 15,
        size: 7,
        font,
        color: rgb(0, 0, 1),
      });
    }
  }
  
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

module.exports = { generateAnswerSheetPDF };
