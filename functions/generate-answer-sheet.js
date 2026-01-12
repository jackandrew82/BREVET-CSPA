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
  
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  // Nom
  firstPage.drawText('Nom: ' + studentName, {
    x: width - 200,
    y: height - 30,
    size: 12,
    font: boldFont,
    color: rgb(0, 0, 0),
  });
  
  // TEST : Q2 a 5 positions differentes
  if (allAnswers['q2']) {
    const testPositions = [
      { x: 80, y: 740, label: 'A' },
      { x: 80, y: 730, label: 'B' },
      { x: 80, y: 720, label: 'C' },
      { x: 80, y: 710, label: 'D' },
      { x: 80, y: 700, label: 'E' }
    ];
    
    testPositions.forEach(pos => {
      firstPage.drawText(pos.label + ':' + allAnswers['q2'], {
        x: pos.x,
        y: pos.y,
        size: 10,
        font: boldFont,
        color: rgb(1, 0, 0),
      });
    });
  }
  
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

module.exports = { generateAnswerSheetPDF };
