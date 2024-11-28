<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { 
  CalendarIcon, 
  ListBulletIcon,
  ChartBarIcon,
  Cog6ToothIcon
} from '@heroicons/vue/24/outline';

const store = useStore();
const emit = defineEmits(['viewChange']);

const isCollapsed = ref(false);
const currentView = ref('list');

const navigation = [
  { name: 'List View', icon: ListBulletIcon, view: 'list' },
  { name: 'Calendar', icon: CalendarIcon, view: 'calendar' },
  { name: 'Analytics', icon: ChartBarIcon, view: 'analytics' },
];

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

const changeView = (view: string) => {
  currentView.value = view;
  emit('viewChange', view);
};
</script>

<template>
  <div
    class="h-screen bg-white shadow-lg transition-all duration-300"
    :class="{ 'w-64': !isCollapsed, 'w-16': isCollapsed }"
  >
    <div class="p-4">
      <button
        @click="toggleSidebar"
        class="p-2 rounded-lg hover:bg-gray-100"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <nav class="mt-4">
      <ul class="space-y-2">
        <li v-for="item in navigation" :key="item.view">
          <button
            @click="changeView(item.view)"
            class="w-full p-3 flex items-center space-x-3 hover:bg-gray-100 transition-colors"
            :class="{ 'bg-blue-50 text-blue-600': currentView === item.view }"
          >
            <component :is="item.icon" class="w-6 h-6" />
            <span v-if="!isCollapsed">{{ item.name }}</span>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>