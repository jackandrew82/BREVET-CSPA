const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Permettre les requêtes depuis ton site
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Gérer les requêtes OPTIONS (preflight)
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    const { student_name, brevet, score, mistakes_json, answers_json } = data;

    // Configuration SMTP (on utilisera Gmail pour l'instant)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email simple pour commencer
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'brevetcspa@gmail.com',
      subject: `${student_name} - Brevet ${brevet}`,
      text: `
Nom : ${student_name}
Brevet : ${brevet}
Score : ${score}

Questions ratées :
${mistakes_json}

Réponses complètes :
${answers_json}
      `
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Email envoyé' })
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
