const cron = require("node-cron");

const {
  fetchPendingEmails,
  updateTicket,
} = require("../services/email-service");
const sender = require("../config/emailConfig");

/**
 * 10:00 am
 * Every 5 minutes
 * We will check are their any pending emails which was expected to be sent
 * by now  and is pending
 */

const setupJobs = () => {
  cron.schedule("*/5 * * * *", async () => {
    const response = await fetchPendingEmails();
    // console.log(response);

    response.forEach((email) => {
      sender.sendMail(
        {
          to: email.recipientEmail,
          subject: email.subject,
          text: email.content,
        },
        async (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
            await updateTicket(email.id, { status: "SUCCESS" });
          }
        }
      );
    });
  });
};

module.exports = setupJobs;
