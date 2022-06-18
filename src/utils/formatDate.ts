export default function formatDate(dateStr: string): string {
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
