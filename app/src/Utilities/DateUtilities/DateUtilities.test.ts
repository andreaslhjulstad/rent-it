import { DateUtilities } from "./DateUtilities";

describe("DateUtilities", () => {
  test("formatDate gives correct format", () => {
    const date = new Date(2021, 1, 1);
    const formattedDate = DateUtilities.formatDate(date);
    expect(formattedDate).toBe("01.02.21");
  });
  test("daysBetween shows correctly", () => {
    const date1 = new Date(2021, 1, 1);
    const date2 = new Date(2021, 1, 3);
    const daysBetween = DateUtilities.daysBetween(date1, date2);
    expect(daysBetween).toBe(2);
  });
});
