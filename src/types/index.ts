export type TrainingMode = 'multiplication' | 'neighbors' | 'sectors' | 'series';

export interface TrainingResult {
  id: string;
  mode: TrainingMode;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  date: Date;
  details?: Record<string, any>;
}

export interface MultiplicationQuestion {
  multiplier: number;
  multiplicand: number;
  correctAnswer: number;
}

export interface RouletteNumber {
  number: number;
  isRed?: boolean;
  isGreen?: boolean;
  isBlack?: boolean;
}

export type NeighborsSet = RouletteNumber[];