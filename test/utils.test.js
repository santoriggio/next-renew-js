import { time } from "console";
import { convertToUTC } from "../src/utils";
import { isValidTimeZone } from "../src/validators";

//TODO: Aggiungi i test per tutte le funzioni dentro gli utils

describe("timezones", () => {
  let startingDate = new Date();

  beforeEach(() => {
    startingDate = new Date("2023-01-10T00:00:00.000Z");
  });

  const timezones = {
    "America/New_York": new Date("2023-01-10T05:00:00.000Z"),
    "Europe/London": new Date("2023-01-10T00:00:00.000Z"),
    "Asia/Tokyo": new Date("2023-01-09T15:00:00.000Z"),
    "Australia/Sydney": new Date("2023-01-09T13:00:00.000Z"),
    "Africa/Cairo": new Date("2023-01-09T22:00:00.000Z"),
    "America/Los_Angeles": new Date("2023-01-10T08:00:00.000Z"),
    "Asia/Dubai": new Date("2023-01-09T20:00:00.000Z"),
    "Europe/Paris": new Date("2023-01-09T23:00:00.000Z"),
    "Asia/Hong_Kong": new Date("2023-01-09T16:00:00.000Z"),
    //"000": new Date(),
  };

  const keys = Object.keys(timezones);

  for (const timezone of keys) {
    it(timezone, () => {
      //startingDate.setUTCHours(0, 0);
      if (isValidTimeZone(timezone)) {
        const converted = convertToUTC(startingDate, timezone);

        expect(converted).toBeInstanceOf(Date);

        expect(converted).toEqual(timezones[timezone]);
      }
    });
  }
});
