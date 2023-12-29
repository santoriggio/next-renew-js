import nextRenew from "../src/nextRenew";

//Integration tests

describe("basic cases", () => {
  let startingDate = new Date();
  beforeEach(() => {
    startingDate = new Date("2023-01-15T12:00:00.000Z");
  });

  it("daily renew", () => {
    const res = nextRenew({
      from: startingDate,
      type: "day",
    });

    const expectedDate = new Date(startingDate);

    expectedDate.setUTCDate(expectedDate.getUTCDate() + 1);
    expectedDate.setUTCHours(0, 0, 0, 0);

    expect(res.date).toBeInstanceOf(Date);
    expect(res.date).toEqual(expectedDate);

    expect(res.list).toBeInstanceOf(Array);
    expect(res.list.length).toBeGreaterThanOrEqual(1);

    for (let i = 1; i < res.list.length; i++) {
      const currentDate = res.list[i];
      expectedDate.setUTCDate(expectedDate.getUTCDate() + 1);

      expect(currentDate).toBeInstanceOf(Date);
      expect(currentDate).toEqual(expectedDate);
    }
  });
  it("weekly renew", () => {
    const res = nextRenew({
      from: startingDate,
      type: "week",
      weekDay: 3,
    });

    const expectedDate = new Date("2023-01-18T00:00:00.000Z");

    expectedDate.setUTCHours(0, 0, 0, 0);

    expect(res.date).toBeInstanceOf(Date);
    expect(res.date).toEqual(expectedDate);

    expect(res.list).toBeInstanceOf(Array);
    expect(res.list.length).toBeGreaterThanOrEqual(1);

    for (let i = 1; i < res.list.length; i++) {
      const currentDate = res.list[i];
      expectedDate.setUTCDate(expectedDate.getUTCDate() + 7);

      expect(currentDate).toBeInstanceOf(Date);
      expect(currentDate).toEqual(expectedDate);
    }
  });
  it("monthly renew", () => {
    const res = nextRenew({
      from: startingDate,
      type: "month",
      monthDay: 25,
    });

    const expectedDate = new Date("2023-01-25T00:00:00.000Z");

    expectedDate.setUTCHours(0, 0, 0, 0);

    expect(res.date).toBeInstanceOf(Date);
    expect(res.date).toEqual(expectedDate);

    expect(res.list).toBeInstanceOf(Array);
    expect(res.list.length).toBeGreaterThanOrEqual(1);

    for (let i = 1; i < res.list.length; i++) {
      const currentDate = res.list[i];

      expectedDate.setUTCMonth(expectedDate.getUTCMonth() + 1);
      expect(currentDate).toBeInstanceOf(Date);
      expect(currentDate).toEqual(expectedDate);
    }
  });
  it("yearly renew", () => {
    const res = nextRenew({
      from: startingDate,
      type: "year",
      monthDay: 25,
      month: 0,
    });

    const expectedDate = new Date("2023-01-25T00:00:00.000Z");

    expectedDate.setUTCHours(0, 0, 0, 0);

    expect(res.date).toBeInstanceOf(Date);
    expect(res.date).toEqual(expectedDate);

    expect(res.list).toBeInstanceOf(Array);
    expect(res.list.length).toBeGreaterThanOrEqual(1);

    for (let i = 1; i < res.list.length; i++) {
      const currentDate = res.list[i];

      expectedDate.setUTCFullYear(expectedDate.getUTCFullYear() + 1);
      expect(currentDate).toBeInstanceOf(Date);
      expect(currentDate).toEqual(expectedDate);
    }
  });
});
