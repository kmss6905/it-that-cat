export const convertTime = (time: number | string | any) => {
  const dateTime = new Date(time);
  const milliSeconds = new Date().getTime() - dateTime.getTime();
  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `${Math.floor(seconds)}초 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (new Date().getFullYear() - dateTime.getFullYear() == 0) {
    return `${dateTime.getMonth() + 1}월 ${dateTime.getDate()}일`;
  } else {
    return `${dateTime.getFullYear()}년 ${dateTime.getMonth() + 1}월 ${dateTime.getDate()}일`;
  }
};
