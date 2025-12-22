export interface ApiSubtask {
  title: string;
  isCompleted: boolean;
}

export interface ApiTask {
  title: string;
  description: string;
  status: string;
  subtasks: ApiSubtask[];
}

export interface ApiColumn {
  name: string;
  tasks: ApiTask[];
}

export interface ApiBoard {
  name: string;
  columns: ApiColumn[];
}
