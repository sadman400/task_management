import { createStore } from 'vuex';
import { Task } from '../types/task';

interface State {
  tasks: Task[];
  selectedTask: Task | null;
  selectedDate: string | null;
  showTaskForm: boolean;
}

const store = createStore({
  state: {
    tasks: [],
    selectedTask: null,
    selectedDate: null,
    showTaskForm: false,
  } as State,
  
  mutations: {
    ADD_TASK(state, task: Task) {
      state.tasks.push(task);
    },
    UPDATE_TASK(state, updatedTask: Task) {
      const index = state.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask);
      }
    },
    DELETE_TASK(state, taskId: string) {
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
    REORDER_TASKS(state, tasks: Task[]) {
      state.tasks = tasks;
    },
    SET_SELECTED_TASK(state, task: Task | null) {
      state.selectedTask = task;
    },
    SET_SELECTED_DATE(state, date: string | null) {
      state.selectedDate = date;
    },
    TOGGLE_TASK_FORM(state, show: boolean) {
      state.showTaskForm = show;
    },
  },
  
  actions: {
    addTask({ commit }, task: Omit<Task, 'id'>) {
      const newTask = {
        ...task,
        id: crypto.randomUUID(),
      };
      commit('ADD_TASK', newTask);
    },
    updateTask({ commit }, task: Task) {
      commit('UPDATE_TASK', task);
    },
    deleteTask({ commit }, taskId: string) {
      commit('DELETE_TASK', taskId);
    },
    reorderTasks({ commit }, tasks: Task[]) {
      commit('REORDER_TASKS', tasks);
    },
  },
  
  getters: {
    allTasks: (state) => state.tasks || [],
    tasksByPriority: (state) => (priority: Task['priority']) => {
      return (state.tasks || []).filter(task => task.priority === priority);
    },
    completedTasks: (state) => {
      return (state.tasks || []).filter(task => task.completed);
    },
    incompleteTasks: (state) => {
      return (state.tasks || []).filter(task => !task.completed);
    },
    tasksByDate: (state) => (date: string) => {
      return (state.tasks || []).filter(task => task.deadline === date);
    },
  },
});

export default store;