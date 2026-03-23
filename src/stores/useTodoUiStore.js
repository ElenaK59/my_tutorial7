import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useTasksStore } from './useTasksStore'

export const useTodoUiStore = defineStore('todoUi', () => {
  const tasksStore = useTasksStore()

  const filter = ref('all')
  const search = ref('')
  const sortType = ref('manual')

  const filteredTasks = computed(() => {
    let list = [...tasksStore.tasks]

    if (filter.value === 'active') {
      list = list.filter((t) => !t.done)
    }

    if (filter.value === 'done') {
      list = list.filter((t) => t.done)
    }

    if (filter.value === 'important') {
      list = list.filter((t) => t.important)
    }

    if (filter.value === 'deferred') {
      list = list.filter((t) => t.deferred)
    }

    if (search.value.trim()) {
      const q = search.value.toLowerCase()
      list = list.filter((t) => t.text.toLowerCase().includes(q))
    }

    return list
  })

  const sortedTasks = computed(() => {
    const list = [...filteredTasks.value]

    switch (sortType.value) {
      case 'alpha':
        return list.sort((a, b) => a.text.localeCompare(b.text))

      case 'status':
        return list.sort((a, b) => Number(a.done) - Number(b.done))

      case 'deadline':
        return list.sort((a, b) => {
          if (!a.deadline) return 1
          if (!b.deadline) return -1
          return new Date(a.deadline) - new Date(b.deadline)
        })

      default:
        return list
    }
  })

  const isManualSort = computed(() => sortType.value === 'manual')

  return {
    filter,
    search,
    sortType,
    sortedTasks,
    isManualSort,
  }
})
