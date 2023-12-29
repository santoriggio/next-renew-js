import dailyRenew from "./calc/dailyRenew";
import monthlyRenew from "./calc/monthlyRenew";
import weeklyRenew from "./calc/weeklyRenew";
import yearlyRenew from "./calc/yearlyRenew";
import { NextRenewOptions, NextRenewReturn } from "./types";
import validator from "./validators";

export default function nextRenew(options: NextRenewOptions): NextRenewReturn {
  try {
    const numberOfRenewals = validator({
      value: options.numberOfRenewals,
      name: "numberOfRenewals",
      defaultValue: 10,
      rules: [{ type: "number", min: 1, integerOnly: true }],
    });

    const startingDate = calculate(options);

    let list: Date[] = [startingDate];

    for (let i = 1; i < numberOfRenewals; i++) {
      const prevDate = list[i - 1];
      const nextDate = calculate({ ...options, from: prevDate });

      if (typeof options.end_date != "undefined") {
        //check end_date
        const end_date = validator({
          value: options.end_date,
          name: "end_date",
          rules: [{ type: "date" }],
        });

        if (typeof end_date != "undefined" && end_date < nextDate) {
          break;
        }
      }

      list.push(nextDate);
    }

    return {
      date: startingDate,
      list,
    };
  } catch (error) {
    console.error(error);
  }
}

function calculate(options: NextRenewOptions): Date {
  switch (options.type) {
    case "day":
      return dailyRenew(options);
    case "week":
      return weeklyRenew(options);
    case "month":
      return monthlyRenew(options);
    case "year":
      return yearlyRenew(options);
    default:
      return new Date();
  }
}
