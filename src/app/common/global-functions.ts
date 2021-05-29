import {FormControl} from '@angular/forms';

  // tslint:disable-next-line:typedef
export function adultValidator(input: FormControl) {
  if (isValidDate(input.value)) {
    const userBirthday = new Date(input.value);
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
    const isAdult = compareDate(userBirthday, eighteenYearsAgo) !== 1;
    return isAdult ? null : {isMinor: true};
  }
}

    // tslint:disable-next-line:typedef
function isValidDate(d) {
  if (Object.prototype.toString.call(d) === '[object Date]') {
    if (isNaN(d.getTime())) {  // d.valueOf() could also work
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

function compareDate(date1: Date, date2: Date): number {
  // With Date object we can compare dates them using the >, <, <= or >=.
  // The ==, !=, ===, and !== operators require to use date.getTime(),
  // so we need to create a new instance of Date with 'new Date()'
  const d1 = new Date(date1); const d2 = new Date(date2);

  // Check if the dates are equal
  const same = d1.getTime() === d2.getTime();
  if (same) { return 0; }

  // Check if the first is greater than second
  if (d1 > d2) { return 1; }

  // Check if the first is less than second
  if (d1 < d2) { return -1; }
}
