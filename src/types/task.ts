// Task interfaces
export interface Task {
  id: string;
  title: string;
  description?: string;
  subtasks: Subtask[];
  status: string; // "Todo", "Doing", "Done" or column name
  columnId: string;
  boardId: string;
  createdAt?: Date;
  updatedAt?: Date;
  order?: number;
}

export interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
  order?: number;
}

// Task Modal/Dialog interface
export interface TaskModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (updatedTask: Task) => void;
  onDelete?: (taskId: string) => void;
  columns: Column[]; // For status dropdown
  darkMode?: boolean;
}

// Column interface (for status dropdown)
export interface Column {
  id: string;
  name: string;
  color?: string;
  order?: number;
}

// Component props for the Task Details view
export interface TaskDetailsProps {
  task: Task;
  onEdit?: () => void;
  onDelete?: () => void;
  onSubtaskToggle?: (subtaskId: string) => void;
  onStatusChange?: (status: string, columnId: string) => void;
  columns?: Column[];
}