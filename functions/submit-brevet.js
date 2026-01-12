const nodemailer = require('nodemailer');
const { generateErrorReportPDF } = require('./generate-error-report');
const { generateAnswerSheetPDF } = require('./generate-answer-sheet');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    const { student_name, brevet, score, mistakes_json, answers_json } = data;
    
    const mistakes = JSON.parse(mistakes_json);
    const allAnswers = JSON.parse(answers_json);

    console.log('Generating error report PDF...');
    const errorReportPDF = await generateErrorReportPDF(student_name, brevet, score, mistakes);
    
    console.log('Generating answer sheet PDF...');
    const answerSheetPDF = await generateAnswerSheetPDF(student_name, brevet, mistakes, allAnswers);
    
    console.log('PDFs generated, sending email...');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'brevetcspa@gmail.com',
      subject: student_name + ' - Brevet ' + brevet,
      text: 'Nom : ' + student_name + '\nBrevet : ' + brevet + '\nScore : ' + score + '\n\nVoir les 2 PDF joints.',
      attachments: [
        {
          filename: 'Rapport-Erreurs-' + student_name.replace(/\s+/g, '-') + '-Brevet-' + brevet + '.pdf',
          content: errorReportPDF,
          contentType: 'application/pdf'
        },
        {
          filename: 'Feuille-Corrigee-' + student_name.replace(/\s+/g, '-') + '-Brevet-' + brevet + '.pdf',
          content: answerSheetPDF,
          contentType: 'application/pdf'
        }
      ]
    };

    await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully with 2 PDFs');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Email envoye avec 2 PDF' })
    };

  } catch (error) {
    console.error('Erreur complete:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: error.message, stack: error.stack })
    };
  }
};
