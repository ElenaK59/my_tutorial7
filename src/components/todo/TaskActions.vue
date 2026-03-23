<script setup>
const props = defineProps({
  important: Boolean,
  deferred: Boolean,
})
const emit = defineEmits(['update', 'remove'])
</script>

<template>
  <div class="actions">
    <button
      class="star-btn"
      :class="{ active: important }"
      @click="emit('update', 'important')"
      title="Важная"
    >
      ⭐
    </button>
    <button
      class="star-btn"
      :class="{ active: deferred }"
      @click="emit('update', 'deferred')"
      title="Отложена"
    >
      ⏰
    </button>

    <button class="delete" @click="emit('remove')" title="Удалить">✕</button>
  </div>
</template>

<style scoped>
.actions {
  display: flex;
  gap: 6px;
}
button {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
}
.star-btn {
  background: none;
  border: none;
  cursor: pointer;
  height: 24px;
  width: 24px;
  padding: 0;
  /* font-size: 18px; */
  opacity: 0.6;
  transition:
    transform 0.15s,
    opacity 0.15s;
}

.star-btn.active {
  opacity: 1;
  transform: scale(1.2);
}
.delete {
  height: 24px;
  width: 24px;
  background: #d32f2f;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 12px;
  padding: 4px 6px;
}

.delete:hover {
  background: #8c2020;
}
</style>
