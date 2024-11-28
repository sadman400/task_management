<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from './components/layout/Sidebar.vue';
import TaskList from './components/TaskList.vue';
import TaskCalendar from './components/calendar/TaskCalendar.vue';
import TaskAnalytics from './components/analytics/TaskAnalytics.vue';
import TaskForm from './components/TaskForm.vue';

const currentView = ref('list');
const showForm = ref(false);

const handleViewChange = (view: string) => {
  currentView.value = view;
};
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar @viewChange="handleViewChange" />
    
    <main class="flex-1 overflow-y-auto p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ currentView === 'list' ? 'Tasks' : 
             currentView === 'calendar' ? 'Calendar' : 
             currentView === 'analytics' ? 'Analytics' : 'Settings' }}
        </h1>
        <button
          v-if="currentView === 'list'"
          @click="showForm = true"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                 transition-colors shadow-sm hover:shadow"
        >
          Add Task
        </button>
      </div>

      <component
        :is="currentView === 'list' ? TaskList :
             currentView === 'calendar' ? TaskCalendar :
             currentView === 'analytics' ? TaskAnalytics : 'div'"
      />

      <div v-if="showForm" 
           class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <TaskForm @close="showForm = false" />
      </div>
    </main>
  </div>
</template>