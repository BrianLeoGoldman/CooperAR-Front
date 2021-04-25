import {Project} from './project';

export interface User {
  nickname: string;
  email: string;
  projects: Project[];
}
