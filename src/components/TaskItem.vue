<script setup lang="ts">
import { computed } from 'vue';
import { format } from 'date-fns';
import type { Task } from '../types/task';

const props = defineProps<{
  task: Task;
}>();

const emit = defineEmits(['update', 'delete']);

const priorityColor = computed(() => {
  switch (props.task.priority) {
    case 'high':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low':
      return 'bg-green-100 text-green-800 border-green-200';
  }
});

const formattedDate = computed(() => {
  if (!props.task.deadline) return '';
  return format(new Date(props.task.deadline), 'MMM dd, yyyy');
});
</script>

<template>
  <div
    class="card p-4 mb-3 cursor-move animate-scaleIn hover:scale-[1.02] transition-all duration-200"
    :class="{ 'opacity-50': task.completed }"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <input
          type="checkbox"
          :checked="task.completed"
          @change="emit('update', { ...task, completed: !task.completed })"
          class="h-5 w-5 text-primary-600 rounded-full border-2 border-gray-300 focus:ring-primary-500 transition-colors duration-200"
        />
        <h3 class="text-lg font-medium" :class="{ 'line-through text-gray-400': task.completed }">
          {{ task.title }}
        </h3>
      </div>
      <button
        @click="emit('delete', task.id)"
        class="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    
    <div class="mt-3 text-sm text-gray-600">
      {{ task.description }}
    </div>
    
    <div class="mt-4 flex items-center justify-between">
      <span
        class="px-3 py-1 text-xs font-medium rounded-full border"
        :class="priorityColor"
      >
        {{ task.priority }}
      </span>
      <span class="text-sm text-gray-500 font-medium">
        {{ formattedDate }}
      </span>
    </div>
  </div>
</template>