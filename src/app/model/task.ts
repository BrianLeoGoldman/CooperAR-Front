export interface Task {
  id?: number;
  name: string;
  description: string;
  reward: number;
  projectId: string;
  creationDate: string;
  finishDate: string;
  difficulty: string;
  owner: string;
  worker: string;
  state: string;
}
