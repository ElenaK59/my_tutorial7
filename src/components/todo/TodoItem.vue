<script setup>
import TaskActions from './TaskActions.vue'
import { useTaskController } from '@/composables/useTaskController'
import { useDragState } from '@/composables/useDragState'
const props = defineProps({
  task: {
    type: Object,
    required: true,
  },

  draggable: {
    type: Boolean,
    default: false,
  },
})
const { startDrag, endDrag, dropOn, dragOver, hoverId, draggedId, isDraggable } = useDragState()

const emit = defineEmits(['toggle', 'remove', 'edit', 'update'])
const {
  task,
  classes,
  deadlineInfo,
  isEditing,
  editText,
  startEdit,
  saveEdit,
  cancelEdit,
  toggle,
  remove,
  update,
} = useTaskController(() => props.task, emit)
</script>

<template>
  <li
    class="task-item"
    :class="[classes, { 'drop-target': hoverId === task.id }, { dragging: draggedId === task.id }]"
  >
    <span
      class="drag-handle"
      :draggable="isDraggable"
      @dragstart="startDrag(task.id)"
      @dragend="endDrag"
      @dragover.prevent="dragOver(task.id)"
      @drop="dropOn(task.id)"
    >
      ⋮⋮
    </span>

    <template v-if="!isEditing">
      <input
        class="task-checkbox"
        type="checkbox"
        :checked="task.done"
        @mousedown.stop
        @change="toggle"
      />

      <span class="task-text" @dblclick="startEdit">
        {{ task.text }}
      </span>

      <span v-if="deadlineInfo" class="deadline" :class="deadlineInfo.class">
        {{ deadlineInfo.label }} ({{ task.deadline }})
      </span>

      <TaskActions
        :important="classes.important"
        :deferred="classes.deferred"
        @update="update"
        @remove="remove"
      />
    </template>

    <template v-else>
      <input
        v-model="editText"
        class="edit"
        autofocus
        @keyup.enter="saveEdit"
        @keyup.esc="cancelEdit"
        @blur="saveEdit"
      />
    </template>
  </li>
</template>

<style scoped>
/* ===== TASK ITEM ===== */

.task-item {
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    opacity 0.15s ease;

  padding: 6px 8px;
  margin: 4px 0;

  background: rgb(229, 224, 224);

  border-left: 4px solid transparent;
  border-radius: 6px;

  min-height: 32px; /* вместо height */
}
/* линия вставки */
.task-item.drop-target::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: -2px;
  height: 3px;
  background: #4caf50;
  border-radius: 2px;
}
/* lifted card */
.task-item.dragging {
  transform: scale(1.02);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.18);
  opacity: 0.95;
  z-index: 10;
}
/* ===== STATES ===== */

.task-item.done .task-text {
  text-decoration: line-through;
  text-decoration-color: rgb(81, 75, 75);
  text-decoration-thickness: 2px;
  color: rgb(80, 72, 72);
  opacity: 0.8;
}

.task-item.important {
  border-left-color: gold;
}

.task-item.deferred {
  border-left-color: rgb(225, 126, 157);
}

/* ===== TEXT ===== */

.task-text {
  flex: 1;
  min-width: 0;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  text-align: left;
  cursor: pointer;

  transition:
    color 0.2s ease,
    text-decoration-color 0.2s ease;
}

/* ===== CHECKBOX ===== */

.task-checkbox {
  width: 14px;
  height: 14px;
  flex: 0 0 14px;

  margin-left: 4px;

  cursor: pointer;
  accent-color: #4caf50;
}

/* ===== DEADLINE ===== */

.deadline {
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 6px;
  white-space: nowrap;
}

.deadline.overdue {
  background: #ffebee;
  color: #c62828;
  font-weight: 600;
}

.deadline.today {
  background: #fff3e0;
  color: #ef6c00;
}

.deadline.tomorrow {
  background: #e3f2fd;
  color: #1565c0;
}

.deadline.future {
  background: #e8f5e9;
  color: #2e7d32;
}

/* ===== EDIT MODE ===== */

.edit {
  width: 100%;
  border: none;
  outline: none;
  font-size: inherit;
  /* background: transparent; */
  background: white;
}
.task-item:hover {
  background: rgb(236, 232, 232);
}
/* .task-item[draggable='true'] {
  cursor: grab;
}

.task-item[draggable='true'] * {
  cursor: inherit;
}
/* ← исключение */
/*.task-item[draggable='true'] .task-checkbox {
  cursor: pointer;
}

.task-item[draggable='true']:active {
  cursor: grabbing;
}
*/
.drag-handle {
  cursor: grab;
  user-select: none;
  padding: 0 6px;
  opacity: 0.5;
  font-size: 16px;
}

.drag-handle:hover {
  opacity: 1;
}
body.dragging,
body.dragging * {
  cursor: grabbing !important;
}
</style>
