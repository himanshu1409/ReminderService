const express = require("express");
const bodyParser = require("body-parser");
const cron = require("node-cron");

const { PORT } = require("./config/serverConfig");
// const { sendBasicEmail } = require("./services/email-service");
const TicketController = require("./controllers/ticket-controller");
const jobs = require("./utils/job");

const setupAndStartServer = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post("/api/v1/tickets", TicketController.create);

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    jobs();

    // sendBasicEmail(
    //   "airlineservice@gmail.com",
    //   "airlineservice@gmail.com",
    //   "This is a tetsing email",
    //   "Hey, how are you?"
    // );
    // cron.schedule("*/4 * * * * *", () => {
    //   console.log("running a task every two minutes");
    // });
  });
};

setupAndStartServer();
