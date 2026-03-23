import { onMounted, onUnmounted } from 'vue'

export function useUndoRedoShortcuts(undo, redo) {
  function handler(e) {
    // главное условие
    if (isEditableTarget(e.target)) return
    if (e.ctrlKey && e.key === 'z') {
      e.preventDefault()
      undo()
    }

    if (e.ctrlKey && e.key === 'y') {
      e.preventDefault()
      redo()
    }
  }

  onMounted(() => window.addEventListener('keydown', handler))
  onUnmounted(() => window.removeEventListener('keydown', handler))
}
