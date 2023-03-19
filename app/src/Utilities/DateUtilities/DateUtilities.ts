export class DateUtilities {
  static formatDate(date: Date): string {
    return date.toLocaleDateString("no-nb", { day: "2-digit", month: "2-digit", year: "2-digit" });
  }

  static daysBetween(date1: Date, date2: Date): number {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
  }
}
