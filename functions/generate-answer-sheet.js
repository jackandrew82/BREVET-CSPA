const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

async function generateAnswerSheetPDF(studentName, brevet, mistakes, allAnswers) {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595, 842]); // A4
  const { width, height } = page.getSize();
  
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  let y = height - 60;
  
  // En-tete
  page.drawRectangle({
    x: 0,
    y: height - 100,
    width: width,
    height: 100,
    color: rgb(0.95, 0.95, 0.95),
  });
  
  page.drawText('FEUILLE DE REPONSES', {
    x: 50,
    y: y,
    size: 20,
    font: boldFont,
    color: rgb(0.2, 0.2, 0.2),
  });
  
  y -= 30;
  
  page.drawText('Etudiant: ' + studentName + '  |  Brevet: ' + brevet, {
    x: 50,
    y: y,
    size: 12,
    font: boldFont,
  });
  
  y -= 50;
  
  // Map des erreurs
  const errorsMap = {};
  mistakes.forEach(m => {
    errorsMap[m.question] = true;
  });
  
  // Afficher toutes les reponses (Q1-Q60)
  for (let qNum = 1; qNum <= 60; qNum++) {
    const qKey = 'q' + qNum;
    const answer = allAnswers[qKey] || '';
    
    if (y < 80) {
      page = pdfDoc.addPage([595, 842]);
      y = height - 60;
    }
    
    const isError = errorsMap[qNum];
    
    // Rectangle rouge si erreur
    if (isError && answer) {
      page.drawRectangle({
        x: 45,
        y: y - 3,
        width: 505,
        height: 18,
        color: rgb(1, 0.9, 0.9),
        borderColor: rgb(1, 0, 0),
        borderWidth: 1,
      });
    }
    
    // Question numero
    page.drawText('Question ' + qNum + ':', {
      x: 50,
      y: y,
      size: 11,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    
    // Reponse
    const displayAnswer = answer || '(pas de reponse)';
    const answerColor = isError ? rgb(1, 0, 0) : rgb(0, 0, 0);
    const answerFont = isError ? boldFont : font;
    
    page.drawText(displayAnswer.toUpperCase(), {
      x: 150,
      y: y,
      size: 11,
      font: answerFont,
      color: answerColor,
    });
    
    y -= 20;
  }
  
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

module.exports = { generateAnswerSheetPDF };
