<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import type { Task } from '../types/task';

const store = useStore();

const title = ref('');
const description = ref('');
const priority = ref<Task['priority']>('medium');
const deadline = ref('');

const emit = defineEmits(['close']);

const handleSubmit = () => {
  if (!title.value.trim()) return;

  store.dispatch('addTask', {
    title: title.value,
    description: description.value,
    priority: priority.value,
    deadline: deadline.value,
    completed: false,
  });

  title.value = '';
  description.value = '';
  priority.value = 'medium';
  deadline.value = '';
  
  emit('close');
};
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
    <div class="bg-white p-6 rounded-xl shadow-xl max-w-md w-full animate-scaleIn">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">Add New Task</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            v-model="title"
            type="text"
            class="input"
            required
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            v-model="description"
            class="input"
            rows="3"
          ></textarea>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            v-model="priority"
            class="input"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
          <input
            v-model="deadline"
            type="date"
            class="input"
          />
        </div>
        
        <div class="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            @click="emit('close')"
            class="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="btn btn-primary"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  </div>
</template>