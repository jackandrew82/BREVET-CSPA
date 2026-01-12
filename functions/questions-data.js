const QUESTIONS = {
  A: {
    "2": {
      question: "Lesquelles de ces activités de préparation sont appropriées avant un saut ?",
      choices: {
        a: "Visualisation seulement",
        b: "Étirements seulement",
        c: "Révision du plan de vol seulement",
        d: "Toutes ces réponses"
      }
    },
    "3": {
      question: "Quel type de respiration est recommandé avant un saut ?",
      choices: {
        a: "Respirations rapides et courtes",
        b: "Respirations normales",
        c: "Retenir sa respiration",
        d: "Respirations lentes, contrôlées et profondes"
      }
    },
    "4": {
      question: "Quelles sont les 5 étapes principales d'un saut en parachutisme ?",
      choices: {
        a: "Préparation, sortie, chute libre, ouverture, atterrissage",
        b: "Montée, sortie, vol, descente, atterrissage",
        c: "Équipement, vol, saut, parachute, sol",
        d: "Briefing, avion, saut, voilure, retour"
      }
    },
    "5": {
      question: "Un parachutiste responsable doit être :",
      choices: {
        a: "Toujours en compétition",
        b: "Toujours le plus rapide",
        c: "Conscient de ses capacités et limites",
        d: "Toujours seul"
      }
    },
    "6": {
      question: "Avant chaque saut, il est important de :",
      choices: {
        a: "Décider ce que vous allez faire dans ce saut",
        b: "Sauter sans plan",
        c: "Improviser en l'air",
        d: "Suivre les autres sans réfléchir"
      }
    },
    "7": {
      question: "L'équipement de parachutisme doit être :",
      choices: {
        a: "Vérifié avant chaque saut",
        b: "Vérifié une fois par mois",
        c: "Vérifié par quelqu'un d'autre seulement",
        d: "Jamais vérifié si neuf"
      }
    },
    "8": {
      question: "Concernant l'altimètre :",
      choices: {
        a: "Il doit être ajusté au niveau de la mer",
        b: "Il n'est pas nécessaire",
        c: "Il doit être vérifié après l'atterrissage",
        d: "Il doit être ajusté à l'altitude de la zone de saut"
      }
    },
    "9": {
      question: "Le casque en parachutisme est :",
      choices: {
        a: "Optionnel pour les experts",
        b: "Obligatoire pour tous les sauts",
        c: "Seulement pour les débutants",
        d: "Pas nécessaire en VR"
      }
    },
    "11": {
      question: "L'équipement de sécurité principal comprend :",
      choices: {
        a: "Seulement le parachute principal",
        b: "Seulement le parachute de secours",
        c: "Les lunettes",
        d: "Le parachute principal, le parachute de secours et le déclencheur de sécurité"
      }
    },
    "12": {
      question: "Le déclencheur automatique de sécurité (DAS) :",
      choices: {
        a: "Ouvre le parachute de secours à une altitude prédéterminée",
        b: "Ouvre le parachute principal",
        c: "N'est pas fiable",
        d: "Est optionnel"
      }
    },
    "13": {
      question: "Avant de monter dans l'avion, vous devez :",
      choices: {
        a: "Courir vers l'avion",
        b: "Vérifier votre équipement une dernière fois",
        c: "Retirer votre casque",
        d: "Détacher votre parachute de secours"
      }
    },
    "14": {
      question: "En montée, il est important de :",
      choices: {
        a: "Parler constamment",
        b: "Rester concentré et revoir mentalement son saut",
        c: "Dormir",
        d: "Détacher son équipement"
      }
    },
    "15": {
      question: "La vérification de l'altimètre en montée doit être faite :",
      choices: {
        a: "Une seule fois au décollage",
        b: "Jamais",
        c: "Après l'atterrissage",
        d: "Régulièrement pendant la montée"
      }
    },
    "16": {
      question: "À l'approche de l'altitude de saut, vous devez :",
      choices: {
        a: "Vous détendre complètement",
        b: "Fermer les yeux",
        c: "Vous préparer mentalement et physiquement",
        d: "Retirer votre altimètre"
      }
    },
    "17": {
      question: "La communication avec le pilote en montée est :",
      choices: {
        a: "Interdite",
        b: "Optionnelle",
        c: "Importante pour la sécurité",
        d: "Seulement en cas d'urgence"
      }
    },
    "18": {
      question: "Le signal de préparation avant la sortie signifie :",
      choices: {
        a: "Il reste 30 secondes",
        b: "L'avion est en panne",
        c: "Se préparer à sortir, vérifier son équipement",
        d: "Retourner s'asseoir"
      }
    },
    "19": {
      question: "Pendant la montée, il faut :",
      choices: {
        a: "Enlever son parachute",
        b: "Économiser son oxygène mental et rester calme",
        c: "Faire des exercices physiques intenses",
        d: "Ouvrir la porte"
      }
    },
    "20": {
      question: "La position dans l'avion avant la sortie doit être :",
      choices: {
        a: "Debout près de la sortie",
        b: "Allongé",
        c: "Stable et prête pour une sortie sécuritaire",
        d: "N'importe laquelle"
      }
    },
    "23": {
      question: "En chute libre, la position stable de base est :",
      choices: {
        a: "Tête en bas",
        b: "Ventre face au sol, corps arqué",
        c: "Sur le dos",
        d: "En position assise"
      }
    },
    "24": {
      question: "Le temps de chute libre moyen pour un saut à 10000 pieds est d'environ :",
      choices: {
        a: "20 secondes",
        b: "30 secondes",
        c: "55 secondes",
        d: "2 minutes"
      }
    },
    "25": {
      question: "La vitesse terminale en chute libre ventre face au sol est d'environ :",
      choices: {
        a: "190 km/h",
        b: "100 km/h",
        c: "300 km/h",
        d: "500 km/h"
      }
    },
    "26": {
      question: "Pour tourner en chute libre, on utilise principalement :",
      choices: {
        a: "La tête",
        b: "Les bras et les jambes",
        c: "Seulement les jambes",
        d: "On ne peut pas tourner"
      }
    },
    "27": {
      question: "L'altitude minimale d'ouverture du parachute principal pour un brevet A est :",
      choices: {
        a: "1000 pieds",
        b: "2000 pieds",
        c: "3000 pieds",
        d: "4000 pieds"
      }
    },
    "28": {
      question: "Le signal d'ouverture à 5000 pieds signifie :",
      choices: {
        a: "Ouvrir immédiatement ou préparer l'ouverture",
        b: "Continuer la chute libre",
        c: "Faire des figures",
        d: "Fermer les yeux"
      }
    },
    "29": {
      question: "La procédure d'ouverture commence par :",
      choices: {
        a: "Tirer n'importe quelle poignée",
        b: "Fermer les yeux",
        c: "Vérifier l'altitude, se stabiliser, localiser la poignée",
        d: "Crier"
      }
    },
    "30": {
      question: "Après avoir tiré la poignée d'ouverture, on doit :",
      choices: {
        a: "Tirer à nouveau",
        b: "Compter et vérifier l'ouverture du parachute",
        c: "Fermer les yeux",
        d: "Crier"
      }
    },
    "31": {
      question: "En chute libre, il faut toujours garder une conscience de son altitude. Vrai ou Faux ?",
      choices: {
        a: "Vrai",
        b: "Faux"
      }
    },
    "32": {
      question: "Après l'ouverture, la première vérification est :",
      choices: {
        a: "Les élévateurs avant",
        b: "La radio",
        c: "L'altimètre",
        d: "La voile (qu'elle soit ouverte, carrée et contrôlable)"
      }
    },
    "33": {
      question: "Les commandes de parachute servent à :",
      choices: {
        a: "Décorer",
        b: "Tenir",
        c: "Rien",
        d: "Diriger et ralentir le parachute"
      }
    },
    "34": {
      question: "Pour tourner à gauche avec le parachute, on :",
      choices: {
        a: "Tire la commande gauche",
        b: "Tire la commande droite",
        c: "Tire les deux commandes",
        d: "Ne tire rien"
      }
    },
    "35": {
      question: "Pour ralentir et se préparer à l'atterrissage, on :",
      choices: {
        a: "Tire une seule commande",
        b: "Tire progressivement les deux commandes (flare)",
        c: "Lâche les commandes",
        d: "Coupe les suspentes"
      }
    },
    "36": {
      question: "La direction face au vent pour l'atterrissage est :",
      choices: {
        a: "Avec le vent dans le dos",
        b: "De côté",
        c: "Face au vent",
        d: "Peu importe"
      }
    },
    "37": {
      question: "Un parachute en bon état d'ouverture a une forme :",
      choices: {
        a: "Carrée et gonflée",
        b: "Tordue",
        c: "En sablier",
        d: "Fermée"
      }
    },
    "38": {
      question: "Si le parachute principal ne s'ouvre pas correctement, on doit :",
      choices: {
        a: "Utiliser les procédures d'urgence",
        b: "Attendre",
        c: "Crier",
        d: "Ne rien faire"
      }
    },
    "39": {
      question: "L'altitude minimale recommandée pour effectuer des manœuvres sous voile est :",
      choices: {
        a: "500 pieds",
        b: "1000 pieds",
        c: "1500 pieds",
        d: "2000 pieds ou plus selon les RGS"
      }
    },
    "40": {
      question: "Avant l'atterrissage final, il faut :",
      choices: {
        a: "Vérifier qu'on est face au vent et préparer le flare",
        b: "Fermer les yeux",
        c: "Lâcher les commandes",
        d: "Tourner rapidement"
      }
    },
    "41": {
      question: "Le circuit d'atterrissage standard comprend :",
      choices: {
        a: "Vent arrière, base, finale",
        b: "Seulement une ligne droite",
        c: "N'importe quel chemin",
        d: "Aucun
 circuit"
      }
    },
    "42": {
      question: "En VR à 2, il ne faut PAS participer avec :",
      choices: {
        a: "Une personne qui n'a pas le même niveau d'expérience",
        b: "Un ami proche",
        c: "Quelqu'un de plus expérimenté",
        d: "Un instructeur"
      }
    },
    "43": {
      question: "La séparation minimale entre parachutistes en chute libre doit être :",
      choices: {
        a: "Aucune séparation",
        b: "10 pieds",
        c: "Suffisante pour éviter les collisions",
        d: "1000 pieds"
      }
    },
    "44": {
      question: "Le briefing avant un saut en groupe est :",
      choices: {
        a: "Essentiel pour la sécurité",
        b: "Optionnel",
        c: "Seulement pour les débutants",
        d: "Pas nécessaire entre amis"
      }
    },
    "45": {
      question: "En cas de problème en vol, la priorité est de :",
      choices: {
        a: "Filmer",
        b: "Rester calme",
        c: "S'éloigner des autres et gérer le problème selon les procédures",
        d: "Crier"
      }
    },
    "46": {
      question: "La règle de priorité sous voile est :",
      choices: {
        a: "Le premier arrivé",
        b: "Le plus rapide a priorité",
        c: "Le plus bas a priorité",
        d: "Aucune règle"
      }
    },
    "47": {
      question: "Il est sécuritaire de sauter par vent de plus de 20 mph pour un détenteur de brevet A. Vrai ou Faux ?",
      choices: {
        v: "Vrai",
        f: "Faux"
      }
    },
    "48": {
      question: "On peut sauter sans altimètre si on a beaucoup d'expérience. Vrai ou Faux ?",
      choices: {
        v: "Vrai",
        f: "Faux"
      }
    },
    "49": {
      question: "Le parachute de secours doit être replié par un plieur certifié. Vrai ou Faux ?",
      choices: {
        v: "Vrai",
        f: "Faux"
      }
    },
    "50": {
      question: "Il faut toujours vérifier la météo avant de sauter. Vrai ou Faux ?",
      choices: {
        v: "Vrai",
        f: "Faux"
      }
    },
    "51": {
      question: "On peut modifier son équipement de sécurité sans consulter un professionnel. Vrai ou Faux ?",
      choices: {
        v: "Vrai",
        f: "Faux"
      }
    },
    "52": {
      question: "La formation continue est importante même après l'obtention du brevet. Vrai ou Faux ?",
      choices: {
        v: "Vrai",
        f: "Faux"
      }
    },
    "53": {
      question: "Porter un casque lors de tous les sauts est :",
      choices: {
        a: "Une règle du RGS (Règlement Général de Sécurité)",
        b: "Une recommandation seulement"
      }
    },
    "54": {
      question: "Sauter en solo avant d'avoir le brevet approprié est :",
      choices: {
        a: "Interdit par le RGS",
        b: "Une recommandation seulement"
      }
    },
    "55": {
      question: "Faire un briefing détaillé avant un saut en groupe est :",
      choices: {
        a: "Obligatoire selon le RGS",
        b: "Une bonne pratique recommandée"
      }
    },
    "56": {
      question: "L'altitude minimale d'ouverture pour un brevet A est :",
      choices: {
        a: "Définie par le RGS",
        b: "Une simple recommandation"
      }
    },
    "57": {
      question: "Le déclencheur automatique de sécurité (DAS) est :",
      choices: {
        a: "Obligatoire selon le RGS",
        b: "Optionnel mais recommandé"
      }
    },
    "58": {
      question: "Sauter par conditions météo marginales est :",
      choices: {
        a: "Acceptable si on est expérimenté",
        b: "Déconseillé - recommandation de prudence"
      }
    },
    "59": {
      question: "Respecter le circuit d'atterrissage établi est :",
      choices: {
        a: "Une règle de sécurité (RGS)",
        b: "Une courtoisie recommandée"
      }
    }
  },
  
  B: {
    // Questions du brevet B (à remplir plus tard)
  },
  
  C: {
    // Questions du brevet C (à remplir plus tard)
  }
};

module.exports = { QUESTIONS };
