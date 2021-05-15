export interface Task {
  id?: number;
  name: string;
  description: string;
  reward: number;
  projectId: string;
  creationDate: string;
  finishDate: string;
  difficulty: string;
}
