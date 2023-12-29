import { time } from "console";
import { DAY, HOUR, MINUTE, MONTH } from "../src/index";
import {
  convertToUTC,
  monthsToMillis,
  daysToMillis,
  hoursToMillis,
  minutesToMillis,
  weekDayDistance,
} from "../src/utils";
import { isValidTimeZone } from "../src/validators";

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
      if (isValidTimeZone(timezone)) {
        convertToUTC(startingDate, timezone);

        expect(startingDate).toBeInstanceOf(Date);

        expect(startingDate).toEqual(timezones[timezone]);
      }
    });
  }
});

export function getRandomValue(max: number = 1): number {
  const min = 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe("monthsToMillis", () => {
  describe("basic cases", () => {
    it("basic config with random values", () => {
      for (let i = 0; i < 1000; i++) {
        const res = monthsToMillis(i);

        expect(res).toBeDefined();
        expect(res).toEqual(MONTH * i);
      }
    });
    it("with days with random values", () => {
      for (let i = 0; i < 1000; i++) {
        const res = monthsToMillis(i, i);

        expect(res).toBeDefined();
        expect(res).toEqual(MONTH * i + DAY * i);
      }
    });
    it("with hours with random values", () => {
      for (let i = 0; i < 1000; i++) {
        const res = monthsToMillis(i, i, i);

        expect(res).toBeDefined();
        expect(res).toEqual(MONTH * i + DAY * i + HOUR * i);
      }
    });
    it("with minutes with random values", () => {
      for (let i = 0; i < 1000; i++) {
        const res = monthsToMillis(i, i, i, i);

        expect(res).toBeDefined();
        expect(res).toEqual(MONTH * i + DAY * i + HOUR * i + MINUTE * i);
      }
    });
  });
});
describe("daysToMillis", () => {
  describe("basic cases", () => {
    it("with days with random values", () => {
      for (let i = 0; i < 1000; i++) {
        const res = daysToMillis(i);

        expect(res).toBeDefined();
        expect(res).toEqual(DAY * i);
      }
    });
    it("with hours with random values", () => {
      for (let i = 0; i < 1000; i++) {
        const res = daysToMillis(i, i);

        expect(res).toBeDefined();
        expect(res).toEqual(DAY * i + HOUR * i);
      }
    });
    it("with minutes with random values", () => {
      for (let i = 0; i < 1000; i++) {
        const res = daysToMillis(i, i, i);

        expect(res).toBeDefined();
        expect(res).toEqual(DAY * i + HOUR * i + MINUTE * i);
      }
    });
  });
});
describe("hoursToMillis", () => {
  describe("basic cases", () => {
    it("with hours with random values", () => {
      for (let i = 0; i < 1000; i++) {
        const res = hoursToMillis(i);

        expect(res).toBeDefined();
        expect(res).toEqual(HOUR * i);
      }
    });
    it("with minutes with random values", () => {
      for (let i = 0; i < 1000; i++) {
        const res = hoursToMillis(i, i);

        expect(res).toBeDefined();
        expect(res).toEqual(HOUR * i + MINUTE * i);
      }
    });
  });
});
describe("minutesToMillis", () => {
  describe("basic cases", () => {
    it("with minutes with random values", () => {
      for (let i = 0; i < 1000; i++) {
        const res = minutesToMillis(i);

        expect(res).toBeDefined();
        expect(res).toEqual(MINUTE * i);
      }
    });
  });
});
describe("weekDayDistance", () => {
  describe("basic cases", () => {
    it("start day < end day", () => {
      const res = weekDayDistance(1, 3);
      expect(res).toBeDefined();
      expect(res).toEqual(2);
    });
    it("start day > end day", () => {
      const res = weekDayDistance(3, 1);
      expect(res).toBeDefined();
      expect(res).toEqual(5);
    });
  });
  describe("edge cases", () => {
    it("start day == end day", () => {
      const res = weekDayDistance(3, 3);
      expect(res).toBeDefined();
      expect(res).toEqual(7);
    });
    it("start day == 0", () => {
      const res = weekDayDistance(0, 3);
      expect(res).toBeDefined();
      expect(res).toEqual(3);
    });
    it("end day == 0", () => {
      const res = weekDayDistance(3, 0);
      expect(res).toBeDefined();
      expect(res).toEqual(4);
    });
  });
  describe("error cases", () => {
    const cases = ["2", "oo", true, false, [], {}, undefined, null, -10, 7, 10, -1];
    it("invalid start day", () => {
      for (const err of cases) {
        const res = weekDayDistance(err as number, 3);

        expect(res).toBeNull();
      }
    });
    it("invalid end day", () => {
      for (const err of cases) {
        const res = weekDayDistance(3, err as number);

        expect(res).toBeNull();
      }
    });
    it("invalid start & end day", () => {
      for (const err of cases) {
        const res = weekDayDistance(err as number, err as number);

        expect(res).toBeNull();
      }
    });
  });
});
