import {Project} from './project';

export interface User {
  nickname: string;
  email: string;
  password: string;
  projects: Project[];
}
