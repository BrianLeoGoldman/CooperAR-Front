import {Task} from './task';

export interface Project {
  id?: number;
  name: string;
  budget: number;
  description: string;
  owner: string;
  creationDate: string;
  finishDate: string;
  category: string;
  tasks: Task[];
  files: string[];
}
