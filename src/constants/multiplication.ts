export const MULTIPLICATION_TABLES = {
  'times 5': 5,
  'times 8': 8,
  'times 11': 11,
  'times 17': 17,
  'times 35': 35,
} as const;

export type MultiplicationTableKey = keyof typeof MULTIPLICATION_TABLES;