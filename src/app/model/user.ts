import {Project} from './project';

export interface User {
  nickname: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  birthday: string;
  province: string;
  money: number;
  projects: Project[];
}
