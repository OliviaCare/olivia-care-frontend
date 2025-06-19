// Utilidad para calcular los puntajes de la Escala Cervantes SF16
export interface CervantesResults {
  menopausiaySalud: number;
  psiquico: number;
  sexualidad: number;
  relacionPareja: number;
  total: number;
}

export interface DomainResult {
  score: number;
  maxScore: number;
  percentage: number;
  interpretation: string;
}

export interface DetailedResults extends CervantesResults {
  domains: {
    menopausiaySalud: DomainResult;
    psiquico: DomainResult;
    sexualidad: DomainResult;
    relacionPareja: DomainResult;
  };
}

const DOMAIN_RANGES = {
  menopausiaySalud: { min: 0, max: 20, questions: [1, 2, 3, 4, 5] },
  psiquico: { min: 0, max: 20, questions: [6, 7, 8, 9, 10] },
  sexualidad: { min: 0, max: 16, questions: [11, 12, 13, 14] },
  relacionPareja: { min: 0, max: 12, questions: [15, 16, 17] }
};

const calculateDomainScore = (answers: { [key: number]: number }, questionIds: number[]): number => {
  return questionIds.reduce((sum, questionId) => sum + (answers[questionId] || 0), 0);
};

const interpretScore = (percentage: number): string => {
  if (percentage <= 25) return "Impacto leve";
  if (percentage <= 50) return "Impacto moderado";
  if (percentage <= 75) return "Impacto significativo";
  return "Impacto severo";
};

const getDomainResult = (score: number, maxScore: number): DomainResult => {
  const percentage = (score / maxScore) * 100;
  return {
    score,
    maxScore,
    percentage,
    interpretation: interpretScore(percentage)
  };
};

export const calculateCervantesResults = (answers: { [key: number]: number }): DetailedResults => {
  if (!answers || Object.keys(answers).length === 0) {
    throw new Error('No se proporcionaron respuestas para calcular');
  }

  const domainScores = {
    menopausiaySalud: calculateDomainScore(answers, DOMAIN_RANGES.menopausiaySalud.questions),
    psiquico: calculateDomainScore(answers, DOMAIN_RANGES.psiquico.questions),
    sexualidad: calculateDomainScore(answers, DOMAIN_RANGES.sexualidad.questions),
    relacionPareja: calculateDomainScore(answers, DOMAIN_RANGES.relacionPareja.questions)
  };

  const total = Object.values(domainScores).reduce((sum, score) => sum + score, 0);

  return {
    ...domainScores,
    total,
    domains: {
      menopausiaySalud: getDomainResult(domainScores.menopausiaySalud, DOMAIN_RANGES.menopausiaySalud.max),
      psiquico: getDomainResult(domainScores.psiquico, DOMAIN_RANGES.psiquico.max),
      sexualidad: getDomainResult(domainScores.sexualidad, DOMAIN_RANGES.sexualidad.max),
      relacionPareja: getDomainResult(domainScores.relacionPareja, DOMAIN_RANGES.relacionPareja.max)
    }
  };
};