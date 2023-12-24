import nextRenew from "../src/nextRenew";
import { numDays } from "../src/utils";

describe("test numDays function", () => {
  it("test monthDays for 2023", () => {
    const monthDays2023 = {
      0: 31,
      1: 28,
      2: 31,
      3: 30,
      4: 31,
      5: 30,
      6: 31,
      7: 31,
      8: 30,
      9: 31,
      10: 30,
      11: 31,
    };

    for (let i = 0; i < 11; i++) {
      const currentMonthDays = numDays(2023, i);

      expect(currentMonthDays).toEqual(monthDays2023[i]);
    }
  });
});

describe("nextRenew basic config", () => {
  it("check return values", () => {
    const result = nextRenew({ type: "month", monthDay: 25 });

    expect(result.date).toBeInstanceOf(Date);

    expect(result.list).toBeInstanceOf(Array);
    expect(result.list.length).toBeGreaterThan(0);

    result.list.forEach((date) => {
      expect(date).toBeInstanceOf(Date);
    });
  });

  /**
   * Imposta la data di inizio a metà mese del gennaio 2023
   */

  const startingDate = new Date("2023-01-15T00:00:00.000Z");

  it("test daily renewal", () => {
    const result = nextRenew({ type: "day", weekDay: 2, from: startingDate });

    const expectedDate = new Date(startingDate);
    expectedDate.setUTCDate(16);

    expect(result.date).toEqual(expectedDate);
    expect(result.list).toBeInstanceOf(Array);

    expect(result.list.length).toBeGreaterThan(0);

    result.list.forEach((date, _) => {
      expect(date).toBeInstanceOf(Date);

      if (_ == 0) {
        //Se l'indice è 0
        expect(date).toEqual(result.date);
      } else {
        expectedDate.setUTCDate(expectedDate.getUTCDate() + 1);
        expect(date).toEqual(expectedDate);
      }
    });
  });

  it("test weekly renewal", () => {
    const result = nextRenew({ type: "week", weekDay: 2, from: startingDate });

    const expectedDate = new Date(startingDate);
    expectedDate.setUTCDate(17);

    expect(result.date).toEqual(expectedDate);
    expect(result.list).toBeInstanceOf(Array);

    expect(result.list.length).toBeGreaterThan(0);

    result.list.forEach((date, _) => {
      expect(date).toBeInstanceOf(Date);

      if (_ == 0) {
        //Se l'indice è 0
        expect(date).toEqual(result.date);
      } else {
        expectedDate.setUTCDate(expectedDate.getUTCDate() + 7);
        expect(date).toEqual(expectedDate);
      }
    });
  });

  it("test monthly renewal", () => {
    const result = nextRenew({ type: "month", monthDay: 25, from: startingDate });

    expect(result.date).toBeInstanceOf(Date);

    const expectedDate = new Date(startingDate);
    expectedDate.setUTCDate(25);

    expect(result.date).toEqual(expectedDate);
    expect(result.list).toBeInstanceOf(Array);
    expect(result.list.length).toBeGreaterThan(0);

    result.list.forEach((date, _) => {
      expect(date).toBeInstanceOf(Date);

      if (_ == 0) {
        //Se l'indice è 0
        expect(date).toEqual(result.date);
      } else {
        expectedDate.setUTCMonth(expectedDate.getUTCMonth() + 1);
        expect(date).toEqual(expectedDate);
      }
    });
  });

  it("test yearly renewal", () => {
    const result = nextRenew({
      type: "year",
      month: startingDate.getUTCMonth(),
      monthDay: 25,
      from: startingDate,
    });

    expect(result.date).toBeInstanceOf(Date);

    const expectedDate = new Date(startingDate);
    expectedDate.setUTCDate(25);

    expect(result.date).toEqual(expectedDate);
    expect(result.list).toBeInstanceOf(Array);
    expect(result.list.length).toBeGreaterThan(0);

    result.list.forEach((date, _) => {
      expect(date).toBeInstanceOf(Date);

      if (_ == 0) {
        //Se l'indice è 0
        expect(date).toEqual(result.date);
      } else {
        expectedDate.setUTCFullYear(expectedDate.getUTCFullYear() + 1);
        expect(date).toEqual(expectedDate);
      }
    });
  });
});

describe("nextRenew with random interval", () => {
  const randomInterval = Math.floor(Math.random() * 10) + 1;

  const startingDate = new Date("2023-01-15T00:00:00.000Z");

  it("test daily renewal", () => {
    const result = nextRenew({
      type: "day",
      weekDay: 2,
      interval: randomInterval,
      from: startingDate,
    });

    const expectedDate = new Date(startingDate);
    expectedDate.setUTCDate(startingDate.getUTCDate() + randomInterval);

    expect(result.date).toEqual(expectedDate);
    expect(result.list).toBeInstanceOf(Array);

    expect(result.list.length).toBeGreaterThan(0);

    result.list.forEach((date, _) => {
      expect(date).toBeInstanceOf(Date);

      if (_ == 0) {
        //Se l'indice è 0
        expect(date).toEqual(result.date);
      } else {
        expectedDate.setUTCDate(expectedDate.getUTCDate() + randomInterval);
        expect(date).toEqual(expectedDate);
      }
    });
  });

  it("test weekly renewal", () => {
    const result = nextRenew({
      type: "week",
      weekDay: 2,
      interval: randomInterval,
      from: startingDate,
    });

    const expectedDate = new Date(startingDate);
    expectedDate.setUTCDate(17);

    expect(result.date).toEqual(expectedDate);
    expect(result.list).toBeInstanceOf(Array);

    expect(result.list.length).toBeGreaterThan(0);

    result.list.forEach((date, _) => {
      expect(date).toBeInstanceOf(Date);

      if (_ == 0) {
        //Se l'indice è 0
        expect(date).toEqual(result.date);
      } else {
        expectedDate.setUTCDate(expectedDate.getUTCDate() + 7 * randomInterval);
        expect(date).toEqual(expectedDate);
      }
    });
  });

  it("test monthly renewal", () => {
    const result = nextRenew({
      type: "month",
      monthDay: 25,
      interval: randomInterval,
      from: startingDate,
    });

    expect(result.date).toBeInstanceOf(Date);

    const expectedDate = new Date(startingDate);
    expectedDate.setUTCDate(25);

    expect(result.date).toEqual(expectedDate);
    expect(result.list).toBeInstanceOf(Array);
    expect(result.list.length).toBeGreaterThan(0);

    result.list.forEach((date, _) => {
      expect(date).toBeInstanceOf(Date);

      if (_ == 0) {
        //Se l'indice è 0
        expect(date).toEqual(result.date);
      } else {
        expectedDate.setUTCMonth(expectedDate.getUTCMonth() + randomInterval);
        expect(date).toEqual(expectedDate);
      }
    });
  });

  it("test yearly renewal", () => {
    const result = nextRenew({
      type: "year",
      month: startingDate.getUTCMonth(),
      monthDay: 25,
      interval: randomInterval,
      from: startingDate,
    });

    expect(result.date).toBeInstanceOf(Date);

    const expectedDate = new Date(startingDate);
    expectedDate.setUTCDate(25);

    expect(result.date).toEqual(expectedDate);
    expect(result.list).toBeInstanceOf(Array);
    expect(result.list.length).toBeGreaterThan(0);

    result.list.forEach((date, _) => {
      expect(date).toBeInstanceOf(Date);

      if (_ == 0) {
        //Se l'indice è 0
        expect(date).toEqual(result.date);
      } else {
        expectedDate.setUTCFullYear(expectedDate.getUTCFullYear() + randomInterval);
        expect(date).toEqual(expectedDate);
      }
    });
  });
});

describe("last day in month", () => {
  const startingDate = new Date();

  startingDate.setUTCHours(0, 0, 0, 0);

  it("test monthly renew", () => {
    const result = nextRenew({ type: "month", monthDay: 31 });

    expect(result.date).toBeInstanceOf(Date);

    const expectedDate = new Date(startingDate);
    expectedDate.setUTCDate(numDays(startingDate.getUTCFullYear(), startingDate.getUTCMonth()));

    expect(result.date).toEqual(expectedDate);
    expect(result.list).toBeInstanceOf(Array);
    expect(result.list.length).toBeGreaterThan(0);

    result.list.forEach((date, _) => {
      expect(date).toBeInstanceOf(Date);

      if (_ == 0) {
        //Se l'indice è 0
        expect(date).toEqual(result.date);
      } else {
        expectedDate.setUTCDate(1);
        expectedDate.setUTCMonth(expectedDate.getUTCMonth() + 1);

        const monthDays = numDays(expectedDate.getUTCFullYear(), expectedDate.getUTCMonth());

        expectedDate.setUTCDate(monthDays);

        expect(date).toEqual(expectedDate);
      }
    });
  });

  it("test yearly renew with startingDate <", () => {
    startingDate.setUTCFullYear(2023);
    startingDate.setUTCMonth(1);
    startingDate.setUTCDate(25);

    const result = nextRenew({ type: "year", from: startingDate, month: 1, monthDay: 31 });

    expect(result.date).toBeInstanceOf(Date);

    const expectedDate = new Date("2023-02-28T00:00:00.000Z");

    expect(result.date).toEqual(expectedDate);
    expect(result.list).toBeInstanceOf(Array);
    expect(result.list.length).toBeGreaterThan(0);

    result.list.forEach((date, _) => {
      expect(date).toBeInstanceOf(Date);

      if (_ == 0) {
        //Se l'indice è 0
        expect(date).toEqual(result.date);
      } else {
        expectedDate.setUTCDate(1);
        expectedDate.setUTCFullYear(expectedDate.getUTCFullYear() + 1);
        const currentMonthDays = numDays(expectedDate.getUTCFullYear(), 1);

        expectedDate.setUTCDate(currentMonthDays);

        expect(date).toEqual(expectedDate);
      }
    });
  });
  
  it("test yearly renew with startingDate >", () => {
    startingDate.setUTCFullYear(2023);
    startingDate.setUTCMonth(2);
    startingDate.setUTCDate(25);

    const result = nextRenew({ type: "year", from: startingDate, month: 1, monthDay: 31 });

    expect(result.date).toBeInstanceOf(Date);

    const expectedDate = new Date("2024-02-29T00:00:00.000Z");

    expect(result.date).toEqual(expectedDate);
    expect(result.list).toBeInstanceOf(Array);
    expect(result.list.length).toBeGreaterThan(0);

    result.list.forEach((date, _) => {
      expect(date).toBeInstanceOf(Date);

      if (_ == 0) {
        //Se l'indice è 0
        expect(date).toEqual(result.date);
      } else {
        expectedDate.setUTCDate(1);
        expectedDate.setUTCFullYear(expectedDate.getUTCFullYear() + 1);
        const currentMonthDays = numDays(expectedDate.getUTCFullYear(), 1);

        expectedDate.setUTCDate(currentMonthDays);

        expect(date).toEqual(expectedDate);
      }
    });
  });
});
