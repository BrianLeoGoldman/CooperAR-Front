import {Task} from './task';

export interface Project {
  id: number;
  name: string;
  description: string;
  budget: number;
  owner: string;
  tasks: Task[];
}
