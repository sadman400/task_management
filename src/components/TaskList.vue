<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import draggable from 'vuedraggable';
import TaskItem from './TaskItem.vue';
import type { Task } from '../types/task';

const store = useStore();

const tasks = computed(() => store.getters.allTasks || []);

const handleUpdate = (task: Task) => {
  store.dispatch('updateTask', task);
};

const handleDelete = (taskId: string) => {
  store.dispatch('deleteTask', taskId);
};

const handleDragEnd = (event: any) => {
  if (event.to?.list) {
    store.dispatch('reorderTasks', event.to.list);
  }
};
</script>

<template>
  <div class="mt-6">
    <draggable
      :list="tasks"
      item-key="id"
      @end="handleDragEnd"
      ghost-class="opacity-50"
    >
      <template #item="{ element }">
        <TaskItem
          :task="element"
          @update="handleUpdate"
          @delete="handleDelete"
        />
      </template>
    </draggable>
    
    <div v-if="!tasks.length" class="text-center text-gray-500 mt-4">
      No tasks yet. Add some tasks to get started!
    </div>
  </div>
</template>