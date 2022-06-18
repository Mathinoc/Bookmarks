export default function formatDuration(duration: number): string {
  const timeTable = {
    minute: 60,
    hour: 3600,
  };
  const hour = Math.floor(duration / timeTable.hour);
  const minute = Math.floor(duration / timeTable.minute);
  const second = duration % timeTable.minute;

  return `${hour > 0 ? hour + ":" : ""}${minute > 0 ? minute + ":" : hour > 0 ? '00:' : ""}${second > 0 ? second : (hour > 0 || minute > 0) ? '00' : ''}`;
}
