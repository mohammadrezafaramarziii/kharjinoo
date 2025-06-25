export default function toEnglishNumber(value: string): string {
  return String(value).replace(/[۰-۹]/g, (d) =>
    String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))
  );
}
