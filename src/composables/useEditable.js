import { ref } from 'vue'

export function useEditable(initialValueGetter, onSave) {
  const isEditing = ref(false)
  const editText = ref('')
  const canceled = ref(false)
  function normalizeString(v) {
    return typeof v === 'string' ? v : String(v ?? '')
  }

  function startEdit() {
    isEditing.value = true
    const initial = initialValueGetter()

    editText.value = normalizeString(initial)
  }

  function saveEdit() {
    if (canceled.value) {
      canceled.value = false
      return
    }
    const text = String(editText.value ?? '').trim()
    if (!text) return

    onSave(text)
    isEditing.value = false
  }

  function cancelEdit() {
    canceled.value = true
    isEditing.value = false
    // editText.value = initialValueGetter()
  }

  return {
    isEditing,
    editText,
    startEdit,
    saveEdit,
    cancelEdit,
  }
}
