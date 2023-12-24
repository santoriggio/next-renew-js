import { time } from "console";
import { convertToUTC } from "../src/utils";

describe("test the convertToUTC function", () => {
  const timezones = [
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Europe/Berlin",
    "Europe/Rome",
    "Asia/Tokyo",
    "Asia/Shanghai",
    "Australia/Sydney",
  ];

  it("basic config", () => {
    const startingDate = new Date();
    startingDate.setUTCHours(0, 0, 0, 0);
    for (const timezone of timezones) {
      const converted = convertToUTC(startingDate, timezone);
      expect(converted).toBeInstanceOf(Date);
    }
  });
});
