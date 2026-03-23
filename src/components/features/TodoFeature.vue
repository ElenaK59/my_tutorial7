<script setup>
import { ref } from 'vue'
// import { useTodoStore } from '@/stores/todoStore'
import { useTasksStore } from '@/stores/useTasksStore'
import { useTodoUiStore } from '@/stores/useTodoUiStore'

import Toolbar from '@/components/layout/Toolbar.vue'
import Filters from '@/components/todo/Filters.vue'
import SortControls from '@/components/todo/SortControls.vue'
import TodoItem from '@/components/todo/TodoItem.vue'
import HistoryControls from '@/components/todo/HistoryControls.vue'

// import { useDragAndDrop } from '@/composables/useDragAndDrop'
import { useUndoRedoShortcuts } from '@/composables/useUndoRedoShortcuts'

// const store = useTodoStore()

const tasksStore = useTasksStore()
const uiStore = useTodoUiStore()
//const { onDragStart, onDrop, onDragOver } = useDragAndDrop(tasksStore)

const newText = ref('')
const newDeadline = ref(null)

function handleAdd() {
  if (!newText.value.trim()) return

  tasksStore.addTask(newText.value, newDeadline.value)

  newText.value = ''
  newDeadline.value = null
}

useUndoRedoShortcuts(tasksStore.undo, tasksStore.redo)
</script>

<template>
  <div class="container">
    <h1>Мои задачи</h1>

    <div class="add-task">
      <input v-model="newText" placeholder="Новая задача" />
      <input v-model="newDeadline" type="date" />
      <button @click="handleAdd">Добавить</button>
    </div>

    <Toolbar v-model:search="uiStore.search">
      <template #filters>
        <Filters v-model="uiStore.filter" />
      </template>

      <template #sort>
        <SortControls v-model="uiStore.sortType" />
      </template>
    </Toolbar>

    <ul>
      <!-- <pre>{{ uiStore.sortedTasks }}</pre> -->
      <TodoItem
        v-for="task in uiStore.sortedTasks"
        :key="task.id"
        :task="task"
        @toggle="tasksStore.toggleTask"
        @remove="tasksStore.removeTask"
        @edit="tasksStore.editTask"
        @update="tasksStore.updateTask"
      />
      <p>Активных задач: {{ tasksStore.activeCount }}</p>
    </ul>

    <HistoryControls
      :canUndo="tasksStore.past.length > 0"
      :canRedo="tasksStore.future.length > 0"
      @undo="tasksStore.undo"
      @redo="tasksStore.redo"
    />
  </div>
</template>
<style scoped>
.container {
  background: white;
  padding: 20px 25px;
  border-radius: 8px;
  /* justify-content: center; */
  width: 600px;
}
h1 {
  text-align: center;
  margin-bottom: 20px;
}
.add-task {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

input {
  flex: 1;
  padding: 6px;
}

button {
  padding: 6px 12px;
}

ul {
  list-style: none;
  padding: 0;
}

.active {
  background-color: hsla(160, 100%, 37%, 0.2);
}

.search {
  padding: 8px;
  font-size: 14px;
  margin-left: 12px;
}
.sort-select {
  padding: 8px;
  font-size: 14px;
  margin-right: 12px;
}
.edit {
  padding: 4px;
  font-size: 14px;
}

.deadline {
  font-size: 12px;
  color: #d9534f;
  margin-left: 8px;
}
/* li[draggable='true'] {
  cursor: grab;
}

li[draggable='true']:active {
  cursor: grabbing;
} */
</style>
