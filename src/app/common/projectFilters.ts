import {Project} from '../model/project';

export function filterProjectsByText(filterBy: string, projects: Project[]): Project[] {
  filterBy = filterBy.toLocaleLowerCase();
  return projects.filter((project: Project) =>
    (project.name.toLocaleLowerCase().indexOf(filterBy) !== -1) ||
    (project.description.toLocaleLowerCase().indexOf(filterBy) !== -1));
}

export function filterProjectsByCategory(category: string, projects: Project[]): Project[] {
  return projects.filter((project: Project) =>
    (project.category === category));
}

export function filterProjectsByBudget(budget: string, projects: Project[]): Project[] {
  switch (budget) {
    case '1':
      return projects.filter((project: Project) =>
        ((project.budget >= 0) && (project.budget < 1000)));
    case '2':
      return projects.filter((project: Project) =>
        ((project.budget >= 1000) && (project.budget < 50000)));
    case '3':
      return projects.filter((project: Project) =>
        ((project.budget >= 50000) && (project.budget < 150000)));
    case '4':
      return projects.filter((project: Project) =>
        (project.budget >= 150000));
    default:
      console.log('Condition to filter projects by budget was not met');
      return projects;
  }
}

export function filterProjectsByProgress(progress: string, projects: Project[]): Project[] {
  switch (progress) {
    case '1':
      return projects.filter((project: Project) =>
        ((project.percentage >= 0) && (project.percentage < 25)));
    case '2':
      return projects.filter((project: Project) =>
        ((project.percentage >= 25) && (project.percentage < 50)));
    case '3':
      return projects.filter((project: Project) =>
        ((project.percentage >= 50) && (project.percentage < 75)));
    case '4':
      return projects.filter((project: Project) =>
        ((project.percentage >= 75) && (project.percentage <= 100)));
    default:
      console.log('Condition to filter projects by progress was not met');
      return projects;
  }
}
