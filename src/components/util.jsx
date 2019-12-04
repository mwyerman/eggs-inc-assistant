import localforage from 'localforage';

function minutesToDaysHoursMinutes(minutes) {
  const m = Math.round(minutes);
  const t = Array(3).fill(0);
  t[0] = m;

  // convert minutes to hours & minutes
  while (t[0] >= 60) {
    t[1] += 1;
    t[0] -= 60;
  }

  // convert hours to days & hours
  while (t[1] >= 24) {
    t[2] += 1;
    t[1] -= 24;
  }

  return t;
}

function formatCompactTime(timeArray) {
  return `${timeArray[2]}:${(timeArray[1] < 10 ? `0${timeArray[1]}` : timeArray[1])}:${(timeArray[0] < 10 ? `0${timeArray[0]}` : timeArray[0])}`;
}

function formatCompactMinutes(minutes) {
  return formatCompactTime(minutesToDaysHoursMinutes(minutes));
}

function formatDaysHoursMinutes(timeArray) {
  const units = [
    'minute',
    'hour',
    'day',
  ];

  const text = [];
  for (let i = 0; i < timeArray.length; i += 1) {
    if (timeArray[i] !== 0) {
      text.push(`${timeArray[i]} ${units[i]}`);
      if (timeArray[i] !== 1) {
        text[i] += 's';
      }
    }
  }

  let result = '';
  while (text.length > 1) {
    result += `${text.pop()} `;
  }
  if (result !== '') {
    result += `and ${text.pop()}`;
  } else {
    result = text.pop();
  }
  return result;
}

function formatMinutes(minutes) {
  const t = minutesToDaysHoursMinutes(minutes);
  return formatDaysHoursMinutes(t);
}

function getLargeNumberUnits(n = null) {
  const units = [
    { value: 10 ** 0, name: '-', shortName: '-' },
    { value: 10 ** 3, name: 'Thousand', shortName: 'K' },
    { value: 10 ** 6, name: 'Million', shortName: 'M' },
    { value: 10 ** 9, name: 'Billion', shortName: 'B' },
    { value: 10 ** 12, name: 'Trillion', shortName: 'T' },
    { value: 10 ** 15, name: 'Quadrillion', shortName: 'q' },
    { value: 10 ** 18, name: 'Quintillion', shortName: 'Q' },
    { value: 10 ** 21, name: 'Sextillion', shortName: 's' },
    { value: 10 ** 24, name: 'Septillion', shortName: 'S' },
    { value: 10 ** 27, name: 'Octillion', shortName: 'o' },
    { value: 10 ** 30, name: 'Nonillion', shortName: 'N' },
    { value: 10 ** 33, name: 'Decillion', shortName: 'd' },
    { value: 10 ** 36, name: 'Undecillion', shortName: 'U' },
    { value: 10 ** 39, name: 'Duodecillion', shortName: 'D' },
    { value: 10 ** 42, name: 'Tredecillion', shortName: 'Td' },
    { value: 10 ** 45, name: 'Quattordecillion', shortName: 'qd' },
    { value: 10 ** 48, name: 'Quindecillion', shortName: 'Qd' },
    { value: 10 ** 51, name: 'Sexdecillion', shortName: 'sd' },
    { value: 10 ** 54, name: 'Septendecillion', shortName: 'Sd' },
    { value: 10 ** 57, name: 'Octodecillion', shortName: 'Od' },
    { value: 10 ** 60, name: 'Novemdecillion', shortName: 'Nd' },
    { value: 10 ** 63, name: 'Vigintillion', shortName: 'V' },
    { value: 10 ** 66, name: 'Unvigintillion', shortName: 'uV' },
    { value: 10 ** 69, name: 'Duovigintillion', shortName: 'dV' },
    { value: 10 ** 72, name: 'A LOT', shortName: '[X]' },
  ];

  if (n === null || n < 1 || n > units.length - 1) {
    return units;
  }
  return units.splice(0, n);
}

function formatLargeNumber(number) {
  if (number < 1000 || Number.isNaN(number)) {
    return number;
  }
  const abbr = getLargeNumberUnits();

  let i = abbr.length - 1;
  while (i > 0 && number < abbr[i].value) {
    i -= 1;
  }

  return `${+(number / abbr[i].value).toFixed(3)}${abbr[i].shortName}`;
}

function getLocalForageValues(key, callback) {
  localforage.keys().then((keys) => {
    if (keys.includes(key)) {
      localforage.getItem(key).then((obj) => {
        callback(obj);
      })
    }
  })
}

export {
  minutesToDaysHoursMinutes,
  formatDaysHoursMinutes,
  formatMinutes,
  getLargeNumberUnits,
  formatLargeNumber,
  formatCompactTime,
  formatCompactMinutes,
  getLocalForageValues,
};
