export function formatNumber(number :number, locale = 'fr-FR') {
  return number.toLocaleString(locale);
}
