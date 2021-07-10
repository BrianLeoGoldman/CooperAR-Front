import {Task} from '../model/task';


export function filterTasksByText(filterBy: string, tasks: Task[]): Task[] {
  filterBy = filterBy.toLocaleLowerCase();
  return tasks.filter((task: Task) =>
    (task.name.toLocaleLowerCase().indexOf(filterBy) !== -1) ||
    (task.description.toLocaleLowerCase().indexOf(filterBy) !== -1));
}

export function filterTasksByDifficulty(difficulty: string, tasks: Task[]): Task[] {
  return tasks.filter((task: Task) =>
    (task.difficulty === difficulty));
}

export function filterTasksByState(state: string, tasks: Task[]): Task[] {
  return tasks.filter((task: Task) =>
    (task.state === state));
}

export function filterTasksByReward(reward: string, tasks: Task[]): Task[] {
  switch (reward) {
    case '1':
      return tasks.filter((task: Task) =>
        ((task.reward >= 0) && (task.reward < 100)));
    case '2':
      return tasks.filter((task: Task) =>
        ((task.reward >= 100) && (task.reward < 500)));
    case '3':
      return tasks.filter((task: Task) =>
        ((task.reward >= 500) && (task.reward < 1000)));
    case '4':
      return tasks.filter((task: Task) =>
        ((task.reward >= 1000) && (task.reward < 5000)));
    case '5':
      return tasks.filter((task: Task) =>
        ((task.reward >= 5000) && (task.reward < 10000)));
    case '6':
      return tasks.filter((task: Task) =>
        (task.reward >= 10000));
    default:
      console.log('Condition to filter tasks by reward was not met');
      return tasks;
  }
}
