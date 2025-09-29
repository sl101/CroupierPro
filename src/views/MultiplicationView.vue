<template>
  <div class="multiplication-view">
    <div v-if="!store.isTrainingActive" class="mode-selection">
      <h2>Select the multiplication table</h2>
      <div class="table-buttons">
        <AppButton
          v-for="(value, key) in MULTIPLICATION_TABLES"
          :key="key"
          @click="store.setSelectedTable(key)"
        >
          {{ key }} (×{{ value }})
        </AppButton>
      </div>
    </div>

    <div v-else class="training-screen">
      <!--<div class="stats">-->
        <!--<span>Count: {{ store.score }}/{{ store.questionsAsked }}</span>
        <span>Accuracy: {{ Math.round(store.accuracy) }}%</span>-->
      <!--</div>-->

      <div class="question" v-if="store.currentQuestion">
        <h2>{{ store.currentQuestion.multiplier }} × {{ store.currentQuestion.multiplicand }} = ?</h2>
        
        <input
					class="answer-input"
					ref="answerInput"
          v-model="store.userAnswer"
          type="number"
          :disabled="store.isAnswered"
          @keyup.enter="handleAnswer"
          placeholder="Enter the answer"
        />

        <div v-if="store.isAnswered" class="result">
          <p v-if="isCorrect" class="correct">Right! ✅</p>
          <p v-else class="incorrect">
            Incorrect. Correct answer: {{ store.currentQuestion.correctAnswer }}
          </p>
          
          <AppButton  @click="nextQuestion">
            Next question
          </AppButton>
        </div>
        <AppButton v-else @click="handleAnswer">
          Check
        </AppButton>
      </div>

      <AppButton @click="store.resetTraining()" variant="outline">
        Finish the workout
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { useMultiplicationStore } from '../stores/multiplication';
import { MULTIPLICATION_TABLES } from '../constants/multiplication';
//import AppButton from '../components/ui/AppButton.vue';

const store = useMultiplicationStore();

const answerInput = ref <HTMLInputElement | null>(null);

const isCorrect = computed(() => {
  if (!store.currentQuestion) return false;
  return parseInt(store.userAnswer) === store.currentQuestion.correctAnswer;
});

const handleAnswer = () => {
  if (!store.isAnswered) {
    store.checkAnswer();
  }
};

const nextQuestion = () => {
  store.generateNewQuestion();
  // Фокус после генерации нового вопроса
  focusInput();
};

// Функция для фокуса на инпуте
const focusInput = async () => {
  await nextTick(); // Ждем обновления DOM
  if (answerInput.value) {
    answerInput.value.focus();
    answerInput.value.select(); // Опционально: выделяем текст для замены
  }
};

// Следим за изменением текущего вопроса и фокусируемся
watch(() => store.currentQuestion, () => {
  if (store.currentQuestion) {
    focusInput();
  }
});

// Фокус при первом открытии тренировки
watch(() => store.isTrainingActive, (newVal) => {
  if (newVal) {
    focusInput();
  }
});
</script>

<style scoped>
.multiplication-view{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 40px;
}

.answer-input {
  font-size: 1.5rem;
  padding: 0.5rem;
  text-align: center;
  border: 2px solid #ccc;
  border-radius: 8px;
  width: 200px;
  margin: 1rem 0;
}

.answer-input:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
}

.table-buttons{
	display: flex;
	flex-direction: column;
	gap: 40px;
}

.training-screen{
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 40px;
}

.question{
	display: flex;
	flex-direction: column;
	gap: 20px;
}
</style>