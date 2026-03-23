import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref(JSON.parse(localStorage.getItem('vue-tasks')) || [])

  const past = ref([])
  const future = ref([])

  const HISTORY_LIMIT = 30

  function pushHistory(action) {
    past.value.push(action)

    if (past.value.length > HISTORY_LIMIT) {
      past.value.shift()
    }

    future.value = []
  }

  // ===== TASK ACTIONS =====

  function addTask(text, deadline) {
    if (!text.trim()) return

    const task = {
      id: Date.now(),
      text: text.trim(),
      done: false,
      important: false,
      deferred: false,
      deadline: deadline || null,
    }

    tasks.value.push(task)

    pushHistory({
      type: 'add',
      task,
    })
  }

  function toggleTask({ id }) {
    const task = tasks.value.find((t) => t.id === id)
    if (!task) return

    task.done = !task.done

    pushHistory({ type: 'toggle', id })
  }

  function removeTask({ id }) {
    const index = tasks.value.findIndex((t) => t.id === id)
    if (index === -1) return

    const removed = tasks.value[index]
    tasks.value.splice(index, 1)

    pushHistory({
      type: 'remove',
      task: removed,
      index,
    })
  }

  function editTask({ id, text }) {
    const task = tasks.value.find((t) => t.id === id)
    if (!task) return

    const oldText = task.text
    if (task.text === text) return // ← защита от лишних действий и истории, если текст не изменился
    task.text = text

    pushHistory({
      type: 'edit',
      id,
      oldText,
      newText: text,
    })
  }

  function updateTask({ id, field }) {
    const task = tasks.value.find((t) => t.id === id)
    if (!task) return

    task[field] = !task[field]

    pushHistory({
      type: 'update',
      id,
      field,
    })
  }

  function reorderTasks(newOrder) {
    const oldOrder = tasks.value.map((t) => t.id)

    tasks.value = newOrder

    pushHistory({
      type: 'reorder',
      oldOrder,
      newOrder: newOrder.map((t) => t.id),
    })
  }

  // ===== UNDO =====

  function undo() {
    const action = past.value.pop()
    if (!action) return

    switch (action.type) {
      case 'toggle': {
        const task = tasks.value.find((t) => t.id === action.id)
        if (task) task.done = !task.done
        break
      }

      case 'add':
        tasks.value = tasks.value.filter((t) => t.id !== action.task.id)
        break

      case 'remove':
        tasks.value.splice(action.index, 0, action.task)
        break

      case 'edit': {
        const task = tasks.value.find((t) => t.id === action.id)
        if (task) task.text = action.oldText
        break
      }

      case 'update': {
        const task = tasks.value.find((t) => t.id === action.id)
        if (task) task[action.field] = !task[action.field]
        break
      }

      case 'reorder':
        tasks.value = action.oldOrder.map((id) => tasks.value.find((t) => t.id === id))
        break
    }

    future.value.push(action)
  }

  // ===== REDO =====

  function redo() {
    const action = future.value.pop()
    if (!action) return

    switch (action.type) {
      case 'toggle': {
        const task = tasks.value.find((t) => t.id === action.id)
        if (task) task.done = !task.done
        break
      }

      case 'add':
        tasks.value.push(action.task)
        break

      case 'remove':
        tasks.value = tasks.value.filter((t) => t.id !== action.task.id)
        break

      case 'edit': {
        const task = tasks.value.find((t) => t.id === action.id)
        if (task) task.text = action.newText
        break
      }

      case 'update': {
        const task = tasks.value.find((t) => t.id === action.id)
        if (task) task[action.field] = !task[action.field]
        break
      }

      case 'reorder':
        tasks.value = action.newOrder.map((id) => tasks.value.find((t) => t.id === id))
        break
    }

    past.value.push(action)
  }

  const activeCount = computed(() => tasks.value.filter((t) => !t.done).length)

  return {
    tasks,
    past,
    future,
    activeCount,
    addTask,
    toggleTask,
    removeTask,
    editTask,
    updateTask,
    reorderTasks,
    undo,
    redo,
  }
})
