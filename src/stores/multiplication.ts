import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { MULTIPLICATION_TABLES } from '../constants/multiplication';
import type { MultiplicationQuestion } from '../types';
import type { MultiplicationTableKey } from '../constants/multiplication';

export const useMultiplicationStore = defineStore('multiplication', () => {
  // State
  const selectedTable = ref<MultiplicationTableKey | null>(null);
  const currentQuestion = ref<MultiplicationQuestion | null>(null);
  const userAnswer = ref('');
  const isAnswered = ref(false);
  const score = ref(0);
  const questionsAsked = ref(0);

  // Getters
  const accuracy = computed(() => {
    return questionsAsked.value > 0 ? (score.value / questionsAsked.value) * 100 : 0;
  });

  const isTrainingActive = computed(() => selectedTable.value !== null);

  // Actions
  const setSelectedTable = (table: MultiplicationTableKey) => {
    selectedTable.value = table;
    resetTraining();
    generateNewQuestion();
  };

  const generateNewQuestion = () => {
    if (!selectedTable.value) return;
    
    const multiplier = MULTIPLICATION_TABLES[selectedTable.value];
    const multiplicand = Math.floor(Math.random() * 20) + 1;
    
    currentQuestion.value = {
      multiplier,
      multiplicand,
      correctAnswer: multiplier * multiplicand
    };
    
    userAnswer.value = '';
    isAnswered.value = false;
  };

  const checkAnswer = () => {
    if (!currentQuestion.value || isAnswered.value) return false;

    const isCorrect = parseInt(userAnswer.value) === currentQuestion.value.correctAnswer;
    
    isAnswered.value = true;
    if (isCorrect) {
      score.value++;
    }
    questionsAsked.value++;

    return isCorrect;
  };

  const resetTraining = () => {
    userAnswer.value = '';
    isAnswered.value = false;
    score.value = 0;
    questionsAsked.value = 0;
    currentQuestion.value = null;
  };

  return {
    // State
    selectedTable,
    currentQuestion,
    userAnswer,
    isAnswered,
    score,
    questionsAsked,
    
    // Getters
    accuracy,
    isTrainingActive,
    
    // Actions
    setSelectedTable,
    generateNewQuestion,
    checkAnswer,
    resetTraining
  };
});