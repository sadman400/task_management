<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import type { Task } from '../../types/task';

const store = useStore();

const events = computed(() => {
  const tasks = store.getters.allTasks || [];
  return tasks.map((task: Task) => ({
    id: task.id,
    title: task.title,
    start: task.deadline,
    backgroundColor: getPriorityColor(task.priority),
    extendedProps: { task }
  }));
});

const getPriorityColor = (priority: Task['priority']) => {
  switch (priority) {
    case 'high': return '#ef4444';
    case 'medium': return '#f59e0b';
    case 'low': return '#10b981';
    default: return '#6b7280';
  }
};

const handleEventClick = (info: any) => {
  const task = info.event.extendedProps.task;
  store.commit('SET_SELECTED_TASK', task);
};

const handleDateSelect = (info: any) => {
  store.commit('SET_SELECTED_DATE', info.startStr);
  store.commit('TOGGLE_TASK_FORM', true);
};

const calendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,dayGridWeek'
  },
  events: events,
  selectable: true,
  editable: true,
  eventClick: handleEventClick,
  select: handleDateSelect,
  initialDate: new Date()
};
</script>

<template>
  <div class="p-4 bg-white rounded-lg shadow">
    <FullCalendar 
      :options="calendarOptions"
      class="task-calendar"
    />
  </div>
</template>

<style scoped>
.task-calendar :deep(.fc) {
  @apply font-sans;
}

.task-calendar :deep(.fc-button) {
  @apply bg-blue-600 border-0 shadow hover:bg-blue-700;
}

.task-calendar :deep(.fc-event) {
  @apply cursor-pointer shadow-sm hover:shadow transition-shadow;
}
</style>