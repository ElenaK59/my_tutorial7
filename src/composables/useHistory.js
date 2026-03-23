import { reactive } from 'vue'

export function useHistory(stateRef) {
  const history = reactive({
    past: [],
    future: [],
  })

  function saveState() {
    history.past.push(JSON.stringify(stateRef.value))
    history.future = []
  }

  function undo() {
    if (!history.past.length) return

    history.future.push(JSON.stringify(stateRef.value))
    stateRef.value = JSON.parse(history.past.pop())
  }

  function redo() {
    if (!history.future.length) return

    history.past.push(JSON.stringify(stateRef.value))
    stateRef.value = JSON.parse(history.future.pop())
  }

  return {
    history,
    saveState,
    undo,
    redo,
  }
}
