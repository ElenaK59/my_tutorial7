<script setup>
const props = defineProps({
  canUndo: Boolean,
  canRedo: Boolean,
})

const emit = defineEmits(['undo', 'redo'])
</script>

<template>
  <div class="history-buttons">
    <button @click="emit('undo')" :disabled="!canUndo">⭠ Отменить</button>

    <button @click="emit('redo')" :disabled="!canRedo">⭢ Вернуть</button>
  </div>
</template>
<style scoped>
.history-buttons {
  display: flex;
  gap: 6px;
}
button:disabled {
  color: #928a8a; /* Более темный, яркий текст */
  opacity: 1; /* Убирает прозрачность по умолчанию */
  cursor: not-allowed; /* Курсор "запрещено" */
}
</style>
