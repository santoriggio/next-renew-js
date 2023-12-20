import NextRenew from "./dist/index.js";

const nextRenew = new NextRenew();

nextRenew.setMonthDay(22);

console.log(new Date(nextRenew.nextRenew()));
