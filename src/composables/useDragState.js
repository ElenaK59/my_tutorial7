import { useTasksStore } from '@/stores/useTasksStore'
import { useTodoUiStore } from '@/stores/useTodoUiStore'
import { ref, computed, watch } from 'vue'

const draggedId = ref(null)
const hoverId = ref(null)

export function useDragState() {
  const tasksStore = useTasksStore()
  const uiStore = useTodoUiStore()
  const isDraggable = computed(() => uiStore.isManualSort)
  function startDrag(id) {
    if (!uiStore.isManualSort) return

    draggedId.value = id
    document.body.classList.add('dragging')
  }

  function endDrag() {
    draggedId.value = null
    hoverId.value = null
    document.body.classList.remove('dragging')
  }

  function dropOn(targetId) {
    if (!uiStore.isManualSort) return
    if (!draggedId.value) return
    if (draggedId.value === targetId) return

    const list = [...tasksStore.tasks]

    const fromIndex = list.findIndex((t) => t.id === draggedId.value)
    const toIndex = list.findIndex((t) => t.id === targetId)

    if (fromIndex === -1 || toIndex === -1) return

    const moved = list.splice(fromIndex, 1)[0]
    list.splice(toIndex, 0, moved)

    tasksStore.reorderTasks(list)

    endDrag()
  }
  function dragOver(targetId) {
    if (!uiStore.isManualSort) return

    hoverId.value = targetId
  }
  watch(
    () => uiStore.isManualSort,
    () => endDrag(),
  )
  return {
    startDrag,
    endDrag,
    dropOn,
    dragOver,
    hoverId,
    draggedId,
    isDraggable,
  }
}
