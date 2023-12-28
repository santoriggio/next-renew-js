import monthlyRenew from "../../src/calc/monthlyRenew";
import { numDays } from "../../src/utils";

describe("basic cases", () => {
  let startingDate = new Date("2023-01-15T00:00:00.000Z");

  beforeEach(() => {
    startingDate = new Date("2023-01-15T00:00:00.000Z");
  });

  it("date need to occur", () => {
    const result = monthlyRenew({
      from: startingDate,
      monthDay: 25,
    });

    const expectingDate = new Date("2023-01-25T00:00:00.000Z");

    expect(result).toBeInstanceOf(Date);
    expect(result).toEqual(expectingDate);
  });

  it("date has occur", () => {
    const result = monthlyRenew({
      from: startingDate,
      monthDay: 10,
    });

    const expectingDate = new Date("2023-02-10T00:00:00.000Z");

    expect(result).toBeInstanceOf(Date);
    expect(result).toEqual(expectingDate);
  });

  it("custom hours and minutes", () => {
    const res = monthlyRenew({
      from: startingDate,
      monthDay: 25,
      hours: 15,
      minutes: 10,
    });

    const expectingDate = new Date("2023-01-25T15:10:00.000Z");

    expect(res).toEqual(expectingDate);
  });

  it("random interval", () => {
    const interval = Math.floor(Math.random() * 9) + 1;

    const res = monthlyRenew({
      from: startingDate,
      monthDay: 10,
      interval,
    });

    const expectingDate = new Date(startingDate);

    expectingDate.setUTCDate(10);
    expectingDate.setUTCMonth(expectingDate.getUTCMonth() + interval);

    expect(res).toBeInstanceOf(Date);
    expect(res).toEqual(expectingDate);
  });
});

describe("edge cases", () => {
  it("interval from 1 to 1000", () => {
    const startingDate = new Date("2000-01-20T00:00:00.000Z");

    for (let i = 1; i <= 1000; i++) {
      const res = monthlyRenew({
        from: startingDate,
        monthDay: 15,
        interval: i,
      });

      const expectingDate = new Date(startingDate);
      expectingDate.setUTCMonth(expectingDate.getUTCMonth() + i);
      expectingDate.setUTCDate(15);

      expect(res).toBeInstanceOf(Date);
      expect(res).toEqual(expectingDate);
    }
  });

  it("interval from 1 to 1000 of the lastDay of month", () => {
    const startingDate = new Date("2000-01-31T00:00:00.000Z");

    for (let i = 1; i <= 1000; i++) {
      const res = monthlyRenew({
        from: startingDate,
        monthDay: 31,
        interval: i,
      });

      const expectingDate = new Date(startingDate);

      expectingDate.setUTCDate(1);

      expectingDate.setUTCMonth(expectingDate.getUTCMonth() + i);

      const currentMonthDays = numDays(expectingDate.getUTCFullYear(), expectingDate.getUTCMonth());

      expectingDate.setUTCDate(currentMonthDays);

      expect(res).toBeInstanceOf(Date);
      expect(res).toEqual(expectingDate);
    }
  });

  it("last day of month", () => {
    const startingDate = new Date("2023-02-28T00:00:00.000Z");
    const res = monthlyRenew({
      from: startingDate,
      monthDay: 31,
    });

    const expectingDate = new Date("2023-03-31T00:00:00.000Z");

    expect(res).toBeInstanceOf(Date);
    expect(res).toEqual(expectingDate);
  });

  it("last day of month with custom hours after startingDate", () => {
    const startingDate = new Date("2023-02-28T10:00:00.000Z");
    const res = monthlyRenew({
      from: startingDate,
      monthDay: 31,
      hours: 14,
    });

    const expectingDate = new Date("2023-02-28T14:00:00.000Z");

    expect(res).toBeInstanceOf(Date);
    expect(res).toEqual(expectingDate);
  });

  it("last day of month with custom hours before startingDate", () => {
    const startingDate = new Date("2023-02-28T10:00:00.000Z");
    const res = monthlyRenew({
      from: startingDate,
      monthDay: 31,
      hours: 8,
    });

    const expectingDate = new Date("2023-03-31T08:00:00.000Z");

    expect(res).toBeInstanceOf(Date);
    expect(res).toEqual(expectingDate);
  });
});

//TODO: aggiungere test con errori

describe.skip("errors", () => {});
