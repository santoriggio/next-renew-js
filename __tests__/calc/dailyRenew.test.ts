import dailyRenew from "../../src/calc/dailyRenew";

describe("basic cases", () => {
  let startingDate = new Date();
  beforeEach(() => {
    startingDate = new Date("2023-01-01T12:00:00.000Z");
  });

  it("basic config", () => {
    const result = dailyRenew();
    expect(result).toBeInstanceOf(Date);
  });

  it("with startingDate without hours and minutes", () => {
    startingDate.setUTCHours(0, 0);

    const result = dailyRenew({
      from: startingDate,
    });

    const expectedDate = new Date(startingDate);
    expectedDate.setUTCDate(expectedDate.getUTCDate() + 1);

    expect(result).toBeInstanceOf(Date);
    expect(result).toEqual(expectedDate);
  });

  it("with startingDate with hours and minutes", () => {
    const result = dailyRenew({
      from: startingDate,
      hours: startingDate.getUTCHours(),
      minutes: startingDate.getUTCMinutes(),
    });

    const expectedDate = new Date(startingDate);
    expectedDate.setUTCDate(expectedDate.getUTCDate() + 1);

    expect(result).toBeInstanceOf(Date);
    expect(result).toEqual(expectedDate);
  });

  it("before renew", () => {
    const res = dailyRenew({
      from: startingDate,
      hours: 15,
    });

    const expectedDate = new Date(startingDate);
    expectedDate.setUTCHours(15);

    expect(res).toBeInstanceOf(Date);
    expect(res).toEqual(expectedDate);
  });

  it("after renew", () => {
    const res = dailyRenew({
      from: startingDate,
      hours: 8,
    });

    const expectedDate = new Date(startingDate);
    expectedDate.setUTCDate(expectedDate.getUTCDate() + 1);
    expectedDate.setUTCHours(8);

    expect(res).toBeInstanceOf(Date);
    expect(res).toEqual(expectedDate);
  });

  it("timezone America/New_York", () => {
    startingDate.setUTCHours(0, 0, 0, 0);

    const res = dailyRenew({
      from: startingDate,
      timezone: "America/New_York",
    });

    const expectedDate = new Date("2023-01-02T05:00:00.000Z");

    expect(res).toBeInstanceOf(Date);
    expect(res).toEqual(expectedDate);
  });
});

describe("edge cases", () => {
  let startingDate = new Date();
  beforeEach(() => {
    startingDate = new Date("2023-01-01T12:00:00.000Z");
  });

  it("interval from 1 to 1000", () => {
    for (let i = 1; i <= 1000; i++) {
      const res = dailyRenew({
        from: startingDate,
        interval: i,
      });

      const expectedDate = new Date(startingDate);
      expectedDate.setUTCDate(expectedDate.getUTCDate() + i);

      expectedDate.setUTCHours(0, 0, 0, 0);

      expect(res).toBeInstanceOf(Date);
      expect(res).toEqual(expectedDate);
    }
  });
  it("interval from 1 to 1000 with custom hours and minutes", () => {
    const startingDate = new Date("2023-01-01T18:00:00.000Z");

    for (let i = 1; i <= 1000; i++) {
      const res = dailyRenew({
        from: startingDate,
        interval: i,
        hours: 15,
        minutes: 13,
      });

      const expectedDate = new Date(startingDate);
      expectedDate.setUTCDate(expectedDate.getUTCDate() + i);

      expectedDate.setUTCHours(15, 13, 0, 0);

      expect(res).toBeInstanceOf(Date);
      expect(res).toEqual(expectedDate);
    }
  });
  it("minutes to 1", () => {
    const res = dailyRenew({
      from: startingDate,
      minutes: 1,
    });

    const expectedDate = new Date("2023-01-02T00:01:00.000Z");
    expect(res).toBeInstanceOf(Date);
    expect(res).toEqual(expectedDate);
  });
  it("before last minute of day", () => {
    startingDate.setUTCHours(23, 58);
    const res = dailyRenew({
      from: startingDate,
      hours: 23,
      minutes: 59,
    });

    const expectedDate = new Date(startingDate);
    expectedDate.setUTCMinutes(59);

    expect(res).toBeInstanceOf(Date);
    expect(res).toEqual(expectedDate);
  });
  it("after last minute of day", () => {
    startingDate.setUTCHours(23, 58);
    const res = dailyRenew({
      from: startingDate,
      hours: 23,
      minutes: 57,
    });

    const expectedDate = new Date(startingDate);
    expectedDate.setUTCDate(expectedDate.getUTCDate() + 1);
    expectedDate.setUTCMinutes(57);

    expect(res).toBeInstanceOf(Date);
    expect(res).toEqual(expectedDate);
  });
});

describe("error cases", () => {
  let startingDate = new Date();
  beforeEach(() => {
    startingDate = new Date("2023-01-01T12:00:00.000Z");
  });

  it("invalid interval", () => {
    const cases = ["2", "oo", true, false, [], {}, undefined, null, -10, -340, -20];

    for (const err of cases) {
      const res = dailyRenew({
        from: startingDate,
        interval: err as number,
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
      const res = dailyRenew({
        from: startingDate,
        hours: err as number,
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
      const res = dailyRenew({
        from: startingDate,
        minutes: err as number,
      });

      const expectedDate = new Date(startingDate);
      expectedDate.setUTCDate(expectedDate.getUTCDate() + 1);

      expectedDate.setUTCHours(0, 0, 0, 0);

      expect(res).toBeInstanceOf(Date);
      expect(res).toEqual(expectedDate);
    }
  });
});
