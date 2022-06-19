export function formatDuration(duration: number): string {
  const timeTable = {
    minute: 60,
    hour: 3600,
  };
  const hour = Math.floor(duration / timeTable.hour);
  const minute = Math.floor((duration - hour*timeTable.hour) / timeTable.minute);
  const second = (duration % timeTable.minute) || 0;

  return `${hour > 0 ? `${hour}:` : ""}${hour > 0 ? (minute > 0 ? (minute < 10 ? `0${minute}:` : `${minute}:` ) : "00:") : (minute > 0 ? `${minute}:` : "0:")}${second < 10 ? `0${second}` : second}`;
}

export function formatDate(dateStr: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const rawDate = new Date(Date.parse(dateStr)).toLocaleDateString(
    "fr-FR",
    options
  );
  return rawDate;
}