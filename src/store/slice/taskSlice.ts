import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Task type definition
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  priority: "low" | "medium" | "high";
  category?: string;
  createdAt: string;
  updatedAt: string;
}

// Initial state type
interface TasksState {
  tasks: Task[];
  filter: "all" | "active" | "completed";
  searchQuery: string;
  isLoading: boolean;
}

// Initial state
const initialState: TasksState = {
  tasks: [],
  filter: "all",
  searchQuery: "",
  isLoading: false,
};

// Helper function to generate unique ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Add a new task
    addTask: (state, action: PayloadAction<Omit<Task, "id" | "createdAt" | "updatedAt" | "completed">>) => {
      const now = new Date().toISOString();
      const newTask: Task = {
        ...action.payload,
        id: generateId(),
        completed: false,
        createdAt: now,
        updatedAt: now,
      };
      state.tasks.unshift(newTask); // Add to beginning of array
    },

    // Toggle task completion status
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        task.updatedAt = new Date().toISOString();
      }
    },

    // Update an existing task
    updateTask: (state, action: PayloadAction<Partial<Task> & { id: string }>) => {
      const { id, ...updates } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        Object.assign(task, updates);
        task.updatedAt = new Date().toISOString();
      }
    },

    // Delete a task
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },

    // Delete all completed tasks
    deleteCompletedTasks: (state) => {
      state.tasks = state.tasks.filter(task => !task.completed);
    },

    // Set filter for tasks
    setFilter: (state, action: PayloadAction<"all" | "active" | "completed">) => {
      state.filter = action.payload;
    },

    // Set search query
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    // Mark all tasks as completed
    markAllAsCompleted: (state) => {
      state.tasks.forEach(task => {
        task.completed = true;
        task.updatedAt = new Date().toISOString();
      });
    },

    // Mark all tasks as active
    markAllAsActive: (state) => {
      state.tasks.forEach(task => {
        task.completed = false;
        task.updatedAt = new Date().toISOString();
      });
    },

    // Reorder tasks (for drag and drop)
    reorderTasks: (state, action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [removed] = state.tasks.splice(sourceIndex, 1);
      state.tasks.splice(destinationIndex, 0, removed);
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Clear all tasks
    clearAllTasks: (state) => {
      state.tasks = [];
    },
  },
});

// Export actions
export const {
  addTask,
  toggleTask,
  updateTask,
  deleteTask,
  deleteCompletedTasks,
  setFilter,
  setSearchQuery,
  markAllAsCompleted,
  markAllAsActive,
  reorderTasks,
  setLoading,
  clearAllTasks,
} = tasksSlice.actions;

// Selectors (for easy access to state)
export const selectAllTasks = (state: { tasks: TasksState }) => state.tasks.tasks;
export const selectFilteredTasks = (state: { tasks: TasksState }) => {
  const { tasks, filter, searchQuery } = state.tasks;
  
  let filtered = tasks;
  
  // Apply filter
  if (filter === "active") {
    filtered = filtered.filter(task => !task.completed);
  } else if (filter === "completed") {
    filtered = filtered.filter(task => task.completed);
  }
  
  // Apply search
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(task =>
      task.title.toLowerCase().includes(query) ||
      (task.description && task.description.toLowerCase().includes(query)) ||
      (task.category && task.category.toLowerCase().includes(query))
    );
  }
  
  return filtered;
};
export const selectActiveTasksCount = (state: { tasks: TasksState }) =>
  state.tasks.tasks.filter(task => !task.completed).length;
export const selectCompletedTasksCount = (state: { tasks: TasksState }) =>
  state.tasks.tasks.filter(task => task.completed).length;
export const selectFilter = (state: { tasks: TasksState }) => state.tasks.filter;
export const selectSearchQuery = (state: { tasks: TasksState }) => state.tasks.searchQuery;
export const selectIsLoading = (state: { tasks: TasksState }) => state.tasks.isLoading;

// Export reducer
export default tasksSlice.reducer;