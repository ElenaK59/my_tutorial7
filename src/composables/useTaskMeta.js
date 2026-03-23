import { computed } from 'vue'
import { useDeadlineStatus } from './useDeadlineStatus'

export function useTaskMeta(taskRef, labels = {}) {
  // ===== DEADLINE =====
  const deadlineInfo = useDeadlineStatus(() => taskRef().deadline, labels)

  // ===== CLASSES =====
  const classes = computed(() => {
    const task = taskRef()

    return {
      done: task.done,
      important: task.important,
      deferred: task.deferred,
      overdue: deadlineInfo.value?.class === 'overdue',
    }
  })

  // ===== FLAGS =====
  const isOverdue = computed(() => deadlineInfo.value?.class === 'overdue')

  const hasDeadline = computed(() => !!taskRef().deadline)

  return {
    deadlineInfo,
    classes,
    isOverdue,
    hasDeadline,
  }
}
