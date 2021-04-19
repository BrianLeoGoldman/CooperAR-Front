import {Task} from './task';

export interface Project {
  name: string;
  description: string;
  budget: number;
  owner: string;
  tasks: Task[];
}
