// answers.js
// Clé de correction pour les brevets A, B, C
// Format : "numéro_de_question": "réponse"
// Choix multiples : "a" | "b" | "c" | "d"
// Vrai/Faux : "v" (vrai) | "f" (faux)
// RGS/Reco : "a" ou "b" selon l’énoncé

const ANSWERS = {
  A: {
    // SECTION 1 : PRÉPARATION
    "2": "d",
    "3": "d",
    "4": "a",
    "5": "c",
    "6": "a",

    // SECTION 2 : ÉQUIPEMENT
    "7": "a",
    "8": "d",
    "9": "b",
    // 10 = question ouverte (2 éléments) → pas notée automatiquement
    "11": "d",
    "12": "a",
    "13": "b",

    // SECTION 3 : EN MONTÉE
    "14": "b",
    "15": "d",
    "16": "c",
    "17": "c",
    "18": "c",
    "19": "b",
    "20": "c",
    // 21 et 22 = phrases/informations → pas notées comme QCM
    "23": "b",

    // SECTION 4 : CHUTE LIBRE
    "24": "c",
    "25": "a",
    "26": "b",
    "27": "c",
    "28": "a",
    "29": "c",
    "30": "b",
    "31": "a", // Vrai

    // SECTION 5 : CONTRÔLE DE LA VOILURE
    "32": "d",
    "33": "d",
    "34": "a",
    "35": "b",
    "36": "c",
    "37": "a",
    "38": "a",
    "39": "d",
    "40": "a",
    "41": "a",

    // SECTION 6 : CONNAISSANCES TECHNIQUES
    "42": "a",
    "43": "c",
    "44": "a",
    "45": "c",
    "46": "b",

    // Vrai / Faux (47 à 52)
    "47": "f",
    "48": "f",
    "49": "v",
    "50": "v",
    "51": "f",
    "52": "v",

    // RGS (a) ou Recommandations (b) – 53 à 59
    "53": "a",
    "54": "b",
    "55": "b",
    "56": "a",
    "57": "a",
    "58": "b",
    "59": "a"

    // 60 = tracé de circuit (espace libre texte/dessin) → PAS de correction automatique
  },

  B: {
    // À remplir plus tard avec B-CORRIGE.pdf
  },

  C: {
    // À remplir plus tard avec C-CORRIGE.pdf
  }
};
