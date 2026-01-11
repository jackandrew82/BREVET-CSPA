// script.js

let currentBrevet = "A";
let currentName = "";

const startScreen = document.getElementById("start-screen");
const formScreen = document.getElementById("form-screen");
const formTitle = document.getElementById("form-title");
const startBtn = document.getElementById("start-btn");
const saveBtn = document.getElementById("save-btn");
const answerForm = document.getElementById("answer-form");
const statusEl = document.getElementById("status");

function getSelectedBrevet() {
  const radios = document.querySelectorAll("input[name='brevet']");
  for (const r of radios) {
    if (r.checked) return r.value;
  }
  return "A";
}

function getStorageKey() {
  return `brevet_${currentBrevet}_${currentName}`;
}

function saveAnswers() {
  const formData = new FormData(answerForm);
  const answers = {};
  for (const [key, value] of formData.entries()) {
    answers[key] = value;
  }
  const payload = {
    name: currentName,
    brevet: currentBrevet,
    answers: answers
  };
  localStorage.setItem(getStorageKey(), JSON.stringify(payload));
  statusEl.textContent = "Progression sauvegardée sur cet appareil.";
}

function loadSavedAnswers() {
  const raw = localStorage.getItem(getStorageKey());
  if (!raw) return;
  try {
    const payload = JSON.parse(raw);
    if (payload && payload.answers) {
      for (const [q, val] of Object.entries(payload.answers)) {
        const input = answerForm.querySelector(`[name="${q}"][value="${val}"]`);
        if (input) input.checked = true;
      }
      statusEl.textContent = "Anciennes réponses rechargées.";
    }
  } catch (e) {
    console.error(e);
  }
}

startBtn.addEventListener("click", function() {
  const nameInput = document.getElementById("student-name");
  const nameVal = nameInput.value.trim();
  if (!nameVal) {
    alert("Veuillez saisir le nom complet du participant.");
    return;
  }
  currentName = nameVal;
  currentBrevet = getSelectedBrevet();
  formTitle.textContent = "Feuille de réponse – Brevet " + currentBrevet;
  startScreen.classList.add("hidden");
  formScreen.classList.remove("hidden");
  loadSavedAnswers();
});

saveBtn.addEventListener("click", saveAnswers);

answerForm.addEventListener("submit", async function(e) {
  e.preventDefault();
  statusEl.textContent = "Envoi en cours...";

  const formData = new FormData(answerForm);
  const answers = {};
  for (const [key, value] of formData.entries()) {
    answers[key] = value;
  }

  const correctKey = ANSWERS[currentBrevet] || {};
  let total = 0;
  let correctCount = 0;
  const mistakes = [];

  for (const [qNum, rightVal] of Object.entries(correctKey)) {
    total++;
    const userVal = answers[qNum] || null;
    if (userVal === rightVal) {
      correctCount++;
    } else {
      mistakes.push({
        question: qNum,
        user_answer: userVal,
        right_answer: rightVal
      });
    }
  }

  const scorePercent = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  const templateParams = {
    student_name: currentName,
    brevet: currentBrevet,
    score: correctCount + " / " + total + " (" + scorePercent + "%)",
    mistakes_json: JSON.stringify(mistakes, null, 2),
    answers_json: JSON.stringify(answers, null, 2)
  };

  try {
    const result = await emailjs.send("service_y0utpma", "template_ok28zin", templateParams);
    console.log("Email envoyé:", result.status, result.text);
    statusEl.textContent = "Réponses transmises à l'instructeur. Vous pouvez fermer cette page.";
  } catch (err) {
    console.error("Erreur EmailJS:", err);
    statusEl.textContent = "Erreur lors de l'envoi. Veuillez réessayer plus tard.";
  }
});
