import {User} from './user';
import {Project} from './project';
import {Task} from './task';

export const mockedUser1: User = { nickname: 'juan123', firstname: 'Juan', lastname: 'Garcia', password: 'abcdefghij',
  email: 'juan@mail.com', birthday: '', province: 'CHACO', money: 200, projects: []};

export const mockedUser2: User = { nickname: 'maria456', firstname: 'Maria', lastname: 'Garcia', password: '1234567890',
  email: 'maria@mail.com', birthday: '', province: 'SALTA', money: 700, projects: []};

export const mockedProject1: Project = { name: 'MockProject1', budget: 1000, description: 'Descripcion', owner: 'juan123',
  creationDate: '', finishDate: '', category: 'CONSTRUCCION', percentage: 34, tasks: [], files: ['file1.txt', 'file2.txt'] };

export const mockedProject2: Project = { name: 'MockProject2', budget: 790, description: 'Descripcion', owner: 'mari456',
  creationDate: '', finishDate: '', category: 'DEPORTE', percentage: 72, tasks: [], files: ['image1.jpg', 'image2.jpg'] };

export const mockedTask1: Task = { name: 'MockTask1', description: 'Descripcion', reward: 200, projectId: '3', creationDate: '',
  finishDate: '', difficulty: 'REGULAR', owner: 'juan123', worker: 'maria456', state: 'ABIERTA', files: [] };

export const mockedTask2: Task = { name: 'MockTask2', description: 'Descripcion', reward: 300, projectId: '4', creationDate: '',
  finishDate: '', difficulty: 'FACIL', owner: 'maria456', worker: 'juan123', state: 'COMPLETA', files: [] };
