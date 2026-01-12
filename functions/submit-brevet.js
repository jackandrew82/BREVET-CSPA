const nodemailer = require('nodemailer');
const { generateErrorReportPDF } = require('./generate-error-report');

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

    // Générer le PDF du rapport d'erreurs
    const errorReportPDF = await generateErrorReportPDF(student_name, brevet, score, mistakes);

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
      subject: `${student_name} - Brevet ${brevet}`,
      text: `
Nom : ${student_name}
Brevet : ${brevet}
Score : ${score}

Voir le PDF joint pour le rapport d'erreurs détaillé.

Questions ratées :
${mistakes_json}

Réponses complètes :
${answers_json}
      `,
      attachments: [
        {
          filename: `Rapport-Erreurs-${student_name.replace(/\s+/g, '-')}-Brevet-${brevet}.pdf`,
          content: errorReportPDF,
          contentType: 'application/pdf'
        }
      ]
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Email envoyé avec PDF' })
    };

  } catch (error) {
    console.error('Erreur:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};
