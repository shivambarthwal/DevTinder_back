const cron = require("node-cron");

// cron.schedule("* * * * * ", () => {
//   console.log("Running a task every minute", + new Date());
// });
//

// # ┌────────────── second (optional)
//  # │ ┌──────────── minute
//  # │ │ ┌────────── hour
//  # │ │ │ ┌──────── day of month
//  # │ │ │ │ ┌────── month
//  # │ │ │ │ │ ┌──── day of week
//  # │ │ │ │ │ │
//  # │ │ │ │ │ │
//  # * * * * * *

// Example of a cron job that runs every day at 8 AM
// cron.schedule("0 8 * * *", () => {
//   console.log("Running a task every day at 8 AM", + new Date());
//   // Here you can add the code to send an email or perform any other task
// }, {
//   scheduled: true,
//   timezone: "Asia/Kolkata"
// });
