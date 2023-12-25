import dailyRenew from "../src/calc/dailyRenew";

describe("daily renew function", () => {
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

  it("timezone America/New_York", () => {
    //startingDate.setUTCHours(0, 0);

    const timezone = "Europe/Rome";

    const result = dailyRenew({
      from: startingDate,
      timezone,
      hours: startingDate.getUTCHours(),
      minutes: startingDate.getUTCMinutes(),
    });

    expect(result).toBeInstanceOf(Date);

    const expectedDate = new Date("2023-01-02T07:00:00.000Z");
    expect(result).toEqual(expectedDate);
  });
});
