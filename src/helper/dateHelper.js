export function parse(dateString, format) {
  if (typeof dateString !== 'string') {
    return typeof dateString.getDate === 'function' ? dateString : new Date();
  }
  const parts = dateString.split('/');
  const dayPart = format === 'DD/MM/YYYY' ? 0 : 1;
  const monthPart = format === 'DD/MM/YYYY' ? 1 : 0;
  const day = parseInt(parts[dayPart], 10);
  const month = parseInt(parts[monthPart], 10) - 1;
  const year = parseInt(parts[2], 10);
  return new Date(year, month, day);
}

export function format(date, format) {
  if (typeof date.getDate !== 'function') return date;
  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const year = date.getFullYear();
  return format === 'DD/MM/YYYY'
    ? `${day}/${month}/${year}`
    : `${month}/${day}/${year}`;
}
