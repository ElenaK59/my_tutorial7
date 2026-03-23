import { computed } from 'vue'
import { useTaskMeta } from './useTaskMeta'
import { useEditable } from './useEditable'

export function useTaskController(taskRef, emit) {
  const task = computed(() => taskRef())

  // ===== META =====
  const { deadlineInfo, classes } = useTaskMeta(taskRef)

  // ===== EDIT =====
  const { isEditing, editText, startEdit, saveEdit, cancelEdit } = useEditable(
    () => task.value.text,
    (newText) => {
      emit('edit', { id: task.value.id, text: newText })
    },
  )

  // ===== ACTION HELPERS =====
  function toggle() {
    emit('toggle', { id: task.value.id })
  }

  function remove() {
    emit('remove', { id: task.value.id })
  }

  function update(field) {
    emit('update', { id: task.value.id, field })
  }

  return {
    task,
    deadlineInfo,
    classes,
    isEditing,
    editText,
    startEdit,
    saveEdit,
    cancelEdit,
    toggle,
    remove,
    update,
  }
}
