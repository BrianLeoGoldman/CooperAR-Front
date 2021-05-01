import {Project} from './project';

export interface User {
  nickname: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  projects: Project[];
}
