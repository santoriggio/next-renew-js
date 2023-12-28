import yearlyRenew from "../../src/calc/yearlyRenew";
import { numDays } from "../../src/utils";

describe("basic cases", () => {
  let startingDate = new Date("2023-01-15T00:00:00.000Z");

  beforeEach(() => {
    startingDate = new Date("2023-01-15T00:00:00.000Z");
  });

  it("date need to occur", () => {
    const result = yearlyRenew({
      from: startingDate,
      monthDay: 25,
      month: 2,
    });

    const expectingDate = new Date("2023-03-25T00:00:00.000Z");

    expect(result).toBeInstanceOf(Date);
    expect(result).toEqual(expectingDate);
  });

  it("date has occur", () => {
    const result = yearlyRenew({
      from: startingDate,
      monthDay: 10,
      month: 0,
    });

    const expectingDate = new Date("2024-01-10T00:00:00.000Z");

    expect(result).toBeInstanceOf(Date);
    expect(result).toEqual(expectingDate);
  });

  it("custom hours and minutes", () => {
    const result = yearlyRenew({
      from: startingDate,
      monthDay: 25,
      month: 2,
      hours: 12,
      minutes: 13,
    });

    const expectingDate = new Date("2023-03-25T12:13:00.000Z");

    expect(result).toBeInstanceOf(Date);
    expect(result).toEqual(expectingDate);
  });

  it("random interval", () => {
    const interval = Math.floor(Math.random() * 9) + 1;

    const result = yearlyRenew({
      from: startingDate,
      monthDay: 10,
      interval,
      month: 0,
    });

    const expectingDate = new Date("2023-01-10T00:00:00.000Z");

    expectingDate.setUTCFullYear(expectingDate.getUTCFullYear() + interval);

    expect(result).toBeInstanceOf(Date);
    expect(result).toEqual(expectingDate);
  });
});

describe("edge cases", () => {
  it("interval from 1 to 100", () => {
    const startingDate = new Date("2000-01-20T00:00:00.000Z");

    for (let i = 1; i <= 100; i++) {
      const res = yearlyRenew({
        from: startingDate,
        monthDay: 15,
        month: 0,
        interval: i,
      });

      const expectingDate = new Date(startingDate);
      expectingDate.setUTCFullYear(expectingDate.getUTCFullYear() + i);
      expectingDate.setUTCDate(15);

      expect(res).toBeInstanceOf(Date);
      expect(res).toEqual(expectingDate);
    }
  });

  it("interval from 1 to 100 of the lastDay of month", () => {
    const startingDate = new Date("2000-03-31T00:00:00.000Z");

    for (let i = 1; i <= 100; i++) {
      const res = yearlyRenew({
        from: startingDate,
        monthDay: 31,
        month: 1,
        interval: i,
      });

      const expectingDate = new Date(startingDate);

      expectingDate.setUTCDate(1);

      expectingDate.setUTCFullYear(expectingDate.getUTCFullYear() + i, 1);

      const currentMonthDays = numDays(expectingDate.getUTCFullYear(), expectingDate.getUTCMonth());

      expectingDate.setUTCDate(currentMonthDays);

      expect(res).toBeInstanceOf(Date);
      expect(res).toEqual(expectingDate);
    }
  });

  it("last day of month", () => {
    const startingDate = new Date("2023-02-28T00:00:00.000Z");
    const res = yearlyRenew({
      from: startingDate,
      monthDay: 31,
      month: 1,
    });

    const expectingDate = new Date("2024-02-29T00:00:00.000Z");

    expect(res).toBeInstanceOf(Date);
    expect(res).toEqual(expectingDate);
  });
});

//TODO: Aggiungi errori

describe.skip("errors", () => {});
