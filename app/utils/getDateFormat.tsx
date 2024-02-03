const getDateFormat = (date: string | Date) => {
  const formatter = new Date(date);

  const year = formatter.getFullYear();
  const month = formatter.getMonth() + 1;
  const day = formatter.getDate();
  return `${year}.${month >= 10 ? month : '0' + month}.${day >= 10 ? day : '0' + day}`;
};

export default getDateFormat;
