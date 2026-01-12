const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const { QUESTIONS } = require('./questions-data');

async function generateErrorReportPDF(studentName, brevet, score, mistakes) {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595, 842]);
  const { width, height } = page.getSize();
  
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let y = height - 60;

  // En-tete
  page.drawRectangle({
    x: 0,
    y: height - 120,
    width: width,
    height: 120,
    color: rgb(0.95, 0.95, 0.95),
  });

  page.drawText('RAPPORT DE CORRECTION', {
    x: 50,
    y: y,
    size: 24,
    font: boldFont,
    color: rgb(0.2, 0.2, 0.2),
  });

  y -= 35;

  page.drawText('Etudiant : ' + studentName, { 
    x: 50, y: y, size: 14, font: boldFont, color: rgb(0, 0, 0),
  });
  
  y -= 22;
  page.drawText('Brevet : ' + brevet, { 
    x: 50, y: y, size: 12, font, color: rgb(0.3, 0.3, 0.3),
  });
  
  y -= 20;
  
  const scoreText = 'Resultat : ' + score;
  const scorePercent = parseInt(score.match(/\((\d+)%\)/)?.[1] || 0);
  const scoreColor = scorePercent >= 80 ? rgb(0, 0.6, 0) : 
                     scorePercent >= 60 ? rgb(0.8, 0.6, 0) : 
                     rgb(0.8, 0, 0);
  
  page.drawText(scoreText, { 
    x: 50, y: y, size: 14, font: boldFont, color: scoreColor,
  });

  y -= 60;

  if (mistakes.length === 0) {
    page.drawRectangle({
      x: 40, y: y - 40, width: width - 80, height: 60,
      color: rgb(0.9, 1, 0.9), borderColor: rgb(0, 0.6, 0), borderWidth: 2,
    });
    
    page.drawText('FELICITATIONS !', {
      x: 50, y: y - 10, size: 16, font: boldFont, color: rgb(0, 0.6, 0),
    });
    
    page.drawText('Aucune erreur detectee. Excellent travail !', {
      x: 50, y: y - 32, size: 12, font, color: rgb(0, 0.5, 0),
    });
    
  } else {
    page.drawText('QUESTIONS A REVOIR (' + mistakes.length + ')', {
      x: 50, y: y, size: 16, font: boldFont, color: rgb(0.8, 0, 0),
    });
    
    y -= 35;

    const questionsData = QUESTIONS[brevet] || {};

    for (let i = 0; i < mistakes.length; i++) {
      const mistake = mistakes[i];
      const qNum = mistake.question;
      const questionData = questionsData[qNum];
      
      const boxHeight = questionData ? 180 : 75;
      
      if (y < boxHeight + 50) {
        page = pdfDoc.addPage([595, 842]);
        y = height - 60;
      }

      page.drawRectangle({
        x: 40, y: y - boxHeight, width: width - 80, height: boxHeight,
        color: rgb(1, 0.98, 0.95), borderColor: rgb(0.9, 0.9, 0.9), borderWidth: 1,
      });

      page.drawText('Question ' + qNum, {
        x: 50, y: y - 20, size: 13, font: boldFont, color: rgb(0, 0, 0),
      });

      if (questionData) {
        const questionText = questionData.question;
        const maxWidth = width - 120;
        const words = questionText.split(' ');
        let line = '';
        let lineY = y - 38;
        
        for (const word of words) {
          const testLine = line + word + ' ';
          if (font.widthOfTextAtSize(testLine, 9) > maxWidth) {
            page.drawText(line, { x: 55, y: lineY, size: 9, font, color: rgb(0.2, 0.2, 0.2) });
            line = word + ' ';
            lineY -= 12;
          } else {
            line = testLine;
          }
        }
        if (line) {
          page.drawText(line, { x: 55, y: lineY, size: 9, font, color: rgb(0.2, 0.2, 0.2) });
        }

        let choiceY = y - 80;
        const userAnswer = mistake.user_answer || '';
        const rightAnswer = mistake.right_answer;

        ['a', 'b', 'c', 'd', 'v', 'f'].forEach(choice => {
          if (questionData.choices && questionData.choices[choice]) {
            const isUser = choice === userAnswer;
            const isCorrect = choice === rightAnswer;
            
            let prefix = '   ';
            let color = rgb(0.3, 0.3, 0.3);
            let choiceFont = font;
            
            if (isCorrect && isUser) {
              prefix = '[OK] ';
              color = rgb(0, 0.6, 0);
              choiceFont = boldFont;
            } else if (isCorrect) {
              prefix = '[OK] ';
              color = rgb(0, 0.6, 0);
              choiceFont = boldFont;
            } else if (isUser) {
              prefix = '[X] ';
              color = rgb(0.9, 0, 0);
              choiceFont = boldFont;
            }
            
            page.drawText(prefix + choice + ') ' + questionData.choices[choice], {
              x: 60, y: choiceY, size: 9, font: choiceFont, color,
            });
            choiceY -= 15;
          }
        });

      } else {
        const userAnswer = mistake.user_answer || 'Aucune reponse';
        page.drawText('Ta reponse :', {
          x: 70, y: y - 40, size: 10, font: boldFont, color: rgb(0.5, 0.5, 0.5),
        });
        page.drawText(userAnswer, {
          x: 155, y: y - 40, size: 11, font: boldFont, color: rgb(0.9, 0, 0),
        });
        page.drawText('Bonne reponse :', {
          x: 70, y: y - 58, size: 10, font: boldFont, color: rgb(0.5, 0.5, 0.5),
        });
        page.drawText(mistake.right_answer, {
          x: 180, y: y - 58, size: 11, font: boldFont, color: rgb(0, 0.6, 0),
        });
      }

      y -= boxHeight + 15;
    }
  }

  const pages = pdfDoc.getPages();
  pages.forEach((p, index) => {
    p.drawText('CSPA - Correction Brevet ' + brevet + ' - Page ' + (index + 1) + '/' + pages.length, {
      x: 50, y: 20, size: 8, font, color: rgb(0.5, 0.5, 0.5),
    });
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

module.exports = { generateErrorReportPDF };
