// Coordonnees des numeros de questions sur les PDF
// Format: { x: horizontal, y: vertical, page: numero page (0 = premiere) }
// A ajuster selon layout reel

const ANSWER_POSITIONS = {
  A: {
    "2": { x: 30, y: 750, page: 0 },
    "3": { x: 30, y: 720, page: 0 },
    "4": { x: 30, y: 690, page: 0 },
    "5": { x: 30, y: 660, page: 0 },
    "6": { x: 30, y: 630, page: 0 },
    "7": { x: 30, y: 600, page: 0 },
    // On ajoutera les autres apres premier test
  },
  B: {},
  C: {}
};

module.exports = { ANSWER_POSITIONS };
