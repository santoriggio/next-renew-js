# next-renew-js

## ⚠️ Under Development

**Note: This library is currently under active development and is not recommended for production use.**

The next-renew-js library efficiently calculates upcoming renewal dates with flexible interval options. It seamlessly handles daily, weekly, monthly, or yearly scenarios, allowing you to customize calculations based on parameters like interval and start date. Ensure accurate results, even in special cases, for precise renewal date integration.

## Installation

```bash
npm install next-renew-js
```

## Options

| Option             | Type              | Description |
| ------------------ | ----------------- | ----------- |
| **interval**       | `number`          | Represents the interval in which the renewal occurs. Example: An interval of 2 means the renewal occurs every two days, weeks, months, or years. *Optional*. |
| **from**           | `Date`            | Optional. Specifies the starting date from which the renewal should begin. Default: (current Date). |
| **numberOfRenewals** | `number`        | Optional. Indicates the total number of renewals that should occur. |
| **end_date**       | `Date`            | Optional. Specifies an end date for the renewals. |
| **timezone**       | `string`          | Optional. Specifies the timezone in which the renewals should occur. Example: If the timezone is set to "America/New_York", the renewal at midnight on December 21 will be at 18:00 (6:00 PM) on the previous day, accounting for the -6-hour offset from UTC. Default: `undefined`. |
| **type**           | `string`          | Required. Specifies the type of renewal. Choose one of the following: `day`, `week`, `month`, `year`. |
| **weekDay**        | `number`          | Required for `week` type. Specifies the day of the week for weekly renewal (0 for Monday, and so on). Accepted values: 0 to 6. |
| **monthDay**       | `number`          | Required for `month` and `year` types. Specifies the day of the month when the renewal should happen. Accepted values: 1 to 31. |
| **month**          | `number`          | Required for `year` type. Specifies the month of the year when the yearly renewal should happen. Accepted values: 0 to 11. |

## Result 

| Property | Type     | Description                                       |
| -------- | -------- | ------------------------------------------------- |
| `date`   | `Date`   | The date of the next renewal.                     |
| `list`   | `Date[]` | A list of upcoming renewal dates |

## Usage

```javascript
import nextRenew from "next-renew-js";

const startingDate = new Date("2023-01-15T00:00:00.000Z")

const options = {
  type: "month",
  monthDay: 25,
  from: startingDate, // Optional (for demonstration purposes)
};

console.log(result.date); // 2023-01-25T00:00:00.000Z
console.log(result.list); // [2023-01-25T00:00:00.000Z, 2023-02-25T00:00:00.000Z, 2023-03-25T00:00:00.000Z, ...]

```
In some scenarios, special situations may arise that go beyond the basic settings. One such case involves calculating the renewal day when it exceeds the maximum for the current month. In this context, if the specified day exceeds the maximum number of days in the current month, the library behaves in a special way, considering the last day of the month as the renewal day.

For example, if you specify the 31st day for monthly renewal and the current month has fewer than 31 days, the library will automatically adapt the calculation using the last day of the month.

```javascript
import nextRenew from "next-renew-js";

const startingDate = new Date("2023-01-15T00:00:00.000Z")

const options = {
  type: "month",
  monthDay: 31,
  from: startingDate, // Optional (for demonstration purposes)
};

console.log(result.date); // 2023-01-31T00:00:00.000Z
console.log(result.list); // [2023-01-31T00:00:00.000Z, 2023-02-28T00:00:00.000Z, 2023-03-31T00:00:00.000Z, ...]

```




