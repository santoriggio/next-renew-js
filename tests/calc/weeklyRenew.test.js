import weeklyRenew from "../../src/calc/weeklyRenew";

describe("basic cases", () => {
  let startingDate = new Date();
  beforeEach(() => {
    startingDate = new Date("2023-01-04T12:00:00.000Z");
  });

  it("basic config", () => {
    const res = weeklyRenew({
      weekDay: 2,
    });

    expect(res).toBeInstanceOf(Date);
  });

  it("with startingDate without hours and minutes", () => {
    const res = weeklyRenew({
      from: startingDate,
      weekDay: 5,
    });

    const expectedDate = new Date("2023-01-06T00:00:00.000Z");

    expect(res).toBeInstanceOf(Date);
    expect(res).toEqual(expectedDate);
  });

  it("with startingDate with hours and minutes", () => {
    const res = weeklyRenew({
      from: startingDate,
      weekDay: 5,
      hours: 12,
      minutes: 13,
    });

    const expectedDate = new Date("2023-01-06T12:13:00.000Z");

    expect(res).toBeInstanceOf(Date);
    expect(res).toEqual(expectedDate);
  });

  it("startingDate before renew", () => {
    const res = weeklyRenew({
      from: startingDate,
      weekDay: 5,
    });

    const expectedDate = new Date("2023-01-06T00:00:00.000Z");

    expect(res).toBeInstanceOf(Date);
    expect(res).toEqual(expectedDate);
  });

  it("startingDate after renew", () => {
    const res = weeklyRenew({
      from: startingDate,
      weekDay: 2,
    });

    const expectedDate = new Date("2023-01-10T00:00:00.000Z");

    expect(res).toBeInstanceOf(Date);
    expect(res).toEqual(expectedDate);
  });
});

describe("edge cases", () => {
  let startingDate = new Date();
  beforeEach(() => {
    startingDate = new Date("2023-01-04T12:00:00.000Z");
  });

  it("interval from 1 to 1000", () => {
    const expectedDate = new Date("2023-01-10T12:00:00.000Z");

    for (let i = 1; i <= 1000; i++) {
      const res = weeklyRenew({
        from: startingDate,
        weekDay: 2,
        interval: i,
      });

      if (i > 1) {
        expectedDate.setUTCDate(expectedDate.getUTCDate() + 7);
      }

      expectedDate.setUTCHours(0, 0, 0, 0);
      expect(res).toBeInstanceOf(Date);
      expect(res).toEqual(expectedDate);
    }
  });
  it("interval from 1 to 1000 with custom hours and minutes", () => {
    const expectedDate = new Date("2023-01-10T12:00:00.000Z");

    for (let i = 1; i <= 1000; i++) {
      const res = weeklyRenew({
        from: startingDate,
        weekDay: 2,
        hours: 15,
        minutes: 13,
        interval: i,
      });

      if (i > 1) {
        expectedDate.setUTCDate(expectedDate.getUTCDate() + 7);
      }

      expectedDate.setUTCHours(15, 13, 0, 0);
      expect(res).toBeInstanceOf(Date);
      expect(res).toEqual(expectedDate);
    }
  });
  it("minutes to 1", () => {
    const res = weeklyRenew({
      from: startingDate,
      minutes: 1,
      weekDay: 2,
    });

    const expectedDate = new Date("2023-01-10T00:01:00.000Z");
    expect(res).toBeInstanceOf(Date);
    expect(res).toEqual(expectedDate);
  });
  it("before last minute of day", () => {
    startingDate.setUTCHours(23, 58);

    const res = weeklyRenew({
      from: startingDate,
      hours: 23,
      minutes: 59,
      weekDay: 3,
    });

    const expectedDate = new Date(startingDate);
    expectedDate.setUTCMinutes(59);

    expect(res).toBeInstanceOf(Date);
    expect(res).toEqual(expectedDate);
  });
  it("after last minute of day", () => {
    startingDate.setUTCHours(23, 59);
    const res = weeklyRenew({
      from: startingDate,
      hours: 23,
      minutes: 58,
      weekDay: 3,
    });

    const expectedDate = new Date(startingDate);
    expectedDate.setUTCDate(expectedDate.getUTCDate() + 7);
    expectedDate.setUTCMinutes(58);

    expect(res).toBeInstanceOf(Date);
    expect(res).toEqual(expectedDate);
  });
});

describe("error cases", () => {
  let startingDate = new Date();

  beforeEach(() => {
    startingDate = new Date("2023-01-04T12:00:00.000Z");
  });
  it("invalid weekDay", () => {
    const cases = ["2", "oo", true, false, [], {}, undefined, null, -10, -340, -20, 7, 10, 30];

    for (const err of cases) {
      const res = weeklyRenew({
        from: startingDate,
        weekDay: err,
      });

      const expectedDate = new Date(startingDate);
      expectedDate.setUTCDate(8);

      expectedDate.setUTCHours(0, 0, 0, 0);

      expect(res).toBeInstanceOf(Date);
      expect(res).toEqual(expectedDate);
    }
  });
  it("invalid interval", () => {
    const cases = ["2", "oo", true, false, [], {}, undefined, null, -10, -340, -20];

    for (const err of cases) {
      const res = weeklyRenew({
        from: startingDate,
        interval: err,
        weekDay: 4,
      });

      const expectedDate = new Date(startingDate);
      expectedDate.setUTCDate(expectedDate.getUTCDate() + 1);

      expectedDate.setUTCHours(0, 0, 0, 0);

      expect(res).toBeInstanceOf(Date);
      expect(res).toEqual(expectedDate);
    }
  });
  it("invalid hours", () => {
    const cases = ["2", "oo", true, false, [], {}, undefined, null, -10, 100];

    for (const err of cases) {
      const res = weeklyRenew({
        from: startingDate,
        hours: err,
        weekDay: 4,
      });

      const expectedDate = new Date(startingDate);
      expectedDate.setUTCDate(expectedDate.getUTCDate() + 1);

      expectedDate.setUTCHours(0, 0, 0, 0);

      expect(res).toBeInstanceOf(Date);
      expect(res).toEqual(expectedDate);
    }
  });
  it("invalid minutes", () => {
    const cases = ["2", "oo", true, false, [], {}, undefined, null, -30, 1304];

    for (const err of cases) {
      const res = weeklyRenew({
        from: startingDate,
        minutes: err,
        weekDay: 4,
      });

      const expectedDate = new Date(startingDate);
      expectedDate.setUTCDate(expectedDate.getUTCDate() + 1);

      expectedDate.setUTCHours(0, 0, 0, 0);

      expect(res).toBeInstanceOf(Date);
      expect(res).toEqual(expectedDate);
    }
  });
});
