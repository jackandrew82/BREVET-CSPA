var currentBrevet = "A";
var currentName = "";

var startScreen = document.getElementById("start-screen");
var formScreen = document.getElementById("form-screen");
var formTitle = document.getElementById("form-title");
var startBtn = document.getElementById("start-btn");
var saveBtn = document.getElementById("save-btn");
var answerForm = document.getElementById("answer-form");
var statusEl = document.getElementById("status");

function getSelectedBrevet() {
  var radios = document.querySelectorAll("input[name='brevet']");
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) return radios[i].value;
  }
  return "A";
}

function getStorageKey() {
  return "brevet_" + currentBrevet + "_" + currentName;
}

function saveAnswers() {
  var formData = new FormData(answerForm);
  var answers = {};
  formData.forEach(function(value, key) {
    answers[key] = value;
  });
  var payload = {
    name: currentName,
    brevet: currentBrevet,
    answers: answers
  };
  localStorage.setItem(getStorageKey(), JSON.stringify(payload));
  statusEl.textContent = "Progression sauvegardée sur cet appareil.";
}

function loadSavedAnswers() {
  var raw = localStorage.getItem(getStorageKey());
  if (!raw) return;
  try {
    var payload = JSON.parse(raw);
    if (payload && payload.answers) {
      for (var q in payload.answers) {
        var val = payload.answers[q];
        var input = answerForm.querySelector("[name='" + q + "'][value='" + val + "']");
        if (input) input.checked = true;
      }
      statusEl.textContent = "Anciennes réponses rechargées.";
    }
  } catch (e) {
    console.error(e);
  }
}

startBtn.addEventListener("click", function() {
  var nameInput = document.getElementById("student-name");
  var nameVal = nameInput.value.trim();
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

answerForm.addEventListener("submit", function(e) {
  e.preventDefault();
  statusEl.textContent = "Envoi en cours...";

  var formData = new FormData(answerForm);
  var answers = {};
  formData.forEach(function(value, key) {
    answers[key] = value;
  });

  var correctKey = ANSWERS[currentBrevet] || {};
  var total = 0;
  var correctCount = 0;
  var mistakes = [];

  for (var qNum in correctKey) {
    total++;
    var rightVal = correctKey[qNum];
    var userVal = answers[qNum] || null;
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

  var scorePercent = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  var templateParams = {
    student_name: currentName,
    brevet: currentBrevet,
    score: correctCount + " / " + total + " (" + scorePercent + "%)",
    mistakes_json: JSON.stringify(mistakes, null, 2),
    answers_json: JSON.stringify(answers, null, 2)
  };

  emailjs.send("service_y0utpma", "template_ok28zin", templateParams)
    .then(function(result) {
      console.log("Email envoyé:", result.status, result.text);
      statusEl.textContent = "Réponses transmises à l'instructeur. Vous pouvez fermer cette page.";
    })
    .catch(function(err) {
      console.error("Erreur EmailJS:", err);
      statusEl.textContent = "Erreur lors de l'envoi. Veuillez réessayer plus tard.";
    });
});
