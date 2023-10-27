/**
 * 入力時刻を30分単位に切り上げる
 * @param date moment 入力時刻
 * @returns moment 切り上げ後の時刻
 */
export function getNextRounded30Minutes(date: moment.Moment): moment.Moment {
  const next = date.clone();
  next.minutes(Math.ceil(next.minutes() / 30) * 30);
  return next;
}
