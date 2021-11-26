const moment = require('moment');

function gene(quarter, year) {
  year += ''; // for constructor string parameter.
  const monthNums = Array.from(new Array(3)).map((v, i) => {
    return (quarter - 1) * 3 + 1 + i;
  });

  const q1 = moment(year).quarter(quarter);
  const q2 = quarter != 4 ? moment(year).quarter(quarter + 1) : moment((parseInt(year) + 1) + '').quarter(1);
  const months = Array.from(new Array(3)).map((v, i) => {
    const month = (i + (quarter - 1) * 3 + 1);
    const start = moment(q1).startOf('month').add(i * 1, 'month').format('YYYY-MM-DD');
    const end = moment(start).endOf('month').format('YYYY-MM-DD');
    return { month, start, end };
  });

  let weekLength = 0;
  if (quarter === 4) {
    let d = moment(q2).subtract(7, 'day');
    let d2 = moment(q2).subtract(1, 'day').week();
    weekLength = moment(d).week() - moment(q1).week() + 1;
    if (d2 == 1) weekLength++;
  } else {
    weekLength = moment(q2).week() - moment(q1).week() + 1;
  }

  const weeks = Array.from(new Array(weekLength)).map((v, i) => {
    const start = moment(q1).startOf('week').add(1 + i * 7, 'day').format('YYYY-MM-DD');
    const friday = moment(q1).startOf('week').add(5 + i * 7, 'day');
    const end = moment(q1).endOf('week').add(1 + i * 7, 'day').format('YYYY-MM-DD');
    const month = friday.month() + 1;
    return { month, start, end };
  });

  const res = {
    startTime: q1.format('YYYY-MM-DD'),
    endTime: q2.subtract(1, 'day').format('YYYY-MM-DD'),
    months,
    weeks: weeks.filter(v => (monthNums.indexOf(v.month) > -1))
  };
  return res;
}
exports.gene = gene;

/**
 * test cases.
 */
const quarter = '1', year = '2021';
const res = gene(quarter, year);
console.log('res:', res);
