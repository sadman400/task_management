<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const analytics = computed(() => {
  const tasks = store.getters.allTasks || [];
  return {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    high: tasks.filter(t => t.priority === 'high').length,
    medium: tasks.filter(t => t.priority === 'medium').length,
    low: tasks.filter(t => t.priority === 'low').length,
    completion: tasks.length ? 
      Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0
  };
});
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold text-gray-700">Task Overview</h3>
        <div class="mt-4 space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Total Tasks</span>
            <span class="text-2xl font-bold">{{ analytics.total }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Completed</span>
            <span class="text-2xl font-bold text-green-600">
              {{ analytics.completed }}
            </span>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold text-gray-700">Priority Distribution</h3>
        <div class="mt-4 space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-red-600">High</span>
            <span class="font-bold">{{ analytics.high }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-yellow-600">Medium</span>
            <span class="font-bold">{{ analytics.medium }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-green-600">Low</span>
            <span class="font-bold">{{ analytics.low }}</span>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold text-gray-700">Completion Rate</h3>
        <div class="mt-4 flex items-center justify-center">
          <div class="relative h-32 w-32">
            <svg class="h-full w-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#eee"
                stroke-width="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#4ade80"
                stroke-width="3"
                :stroke-dasharray="`${analytics.completion}, 100`"
              />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-2xl font-bold">{{ analytics.completion }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>