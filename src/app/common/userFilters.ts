import {User} from '../model/user';


export function filterUsersByText(filterBy: string, users: User[]): User[] {
  filterBy = filterBy.toLocaleLowerCase();
  return users.filter((user: User) =>
    (user.nickname.toLocaleLowerCase().indexOf(filterBy) !== -1) ||
    (user.firstname.toLocaleLowerCase().indexOf(filterBy) !== -1) ||
    (user.lastname.toLocaleLowerCase().indexOf(filterBy) !== -1));
}
