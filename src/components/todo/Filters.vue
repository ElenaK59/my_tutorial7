<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

function setFilter(value) {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="filters">
    <button :class="{ active: modelValue === 'all' }" @click="setFilter('all')">Все</button>

    <button :class="{ active: modelValue === 'active' }" @click="setFilter('active')">
      Активные
    </button>

    <button :class="{ active: modelValue === 'done' }" @click="setFilter('done')">
      Выполненные
    </button>

    <button :class="{ active: modelValue === 'important' }" @click="setFilter('important')">
      Важные
    </button>

    <button :class="{ active: modelValue === 'deferred' }" @click="setFilter('deferred')">
      Отложенные
    </button>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  gap: 6px;
}

button {
  padding: 4px 10px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 6px;
}

button.active {
  background: #4caf50;
  color: white;
  border-color: #4caf50;
}
</style>
