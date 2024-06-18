const date = new Date();
export const accessTime = date.setTime(date.getTime() + 24 * 60 * 60 * 1000); // 24시간 만료
export const refreshTime = date.setTime(
  date.getTime() + 14 * 24 * 60 * 60 * 1000,
); // 14일 만료
