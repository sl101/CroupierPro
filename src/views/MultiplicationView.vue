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
					class="input"
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
          
          <AppButton @click="store.generateNewQuestion()">
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
import { computed } from 'vue';
import { useMultiplicationStore } from '../stores/multiplication';
import { MULTIPLICATION_TABLES } from '../constants/multiplication';
//import AppButton from '../components/ui/AppButton.vue';

const store = useMultiplicationStore();

const isCorrect = computed(() => {
  if (!store.currentQuestion) return false;
  return parseInt(store.userAnswer) === store.currentQuestion.correctAnswer;
});

const handleAnswer = () => {
  if (!store.isAnswered) {
    store.checkAnswer();
  }
};
</script>

<style scoped>
.training-screen{
	display: flex;
	flex-direction: column;
	gap: 40px;
}

.question{
	display: flex;
	flex-direction: column;
	gap: 20px;
}
</style>