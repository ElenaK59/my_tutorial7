<script setup>
const props = defineProps({
  search: String,
})

const emit = defineEmits(['update:search'])
</script>

<template>
  <div class="toolbar">
    <!-- Сначала Filters -->
    <div class="toolbar-filters">
      <slot name="filters" />
    </div>

    <!--  Потом поиск + сортировка + история -->
    <div class="toolbar-main">
      <input
        class="search"
        type="text"
        placeholder="Поиск..."
        :value="search"
        @input="emit('update:search', $event.target.value)"
      />

      <slot name="sort" />

      <!-- <div class="history">
        <button @click="emit('undo')" :disabled="!canUndo">⭠</button>
        <button @click="emit('redo')" :disabled="!canRedo">⭢</button>
      </div> -->
    </div>
  </div>
</template>
<style scoped>
.toolbar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.toolbar-main {
  display: flex;
  flex-grow: 1;
  width: 100%;
  padding: 0 12px;

  justify-content: center;
  gap: 12px;
}
.search {
  flex-grow: 1;
  padding: 8px;
  font-size: 14px;
  margin-left: 12px;
}

.toolbar-filters {
  display: flex;
  gap: 8px;
}
</style>
