import MailService from "@sendgrid/mail";

class NotificationDispatcher {
  static async send(data) {
    const { fileName, content } = data;
    const base64 = Buffer.from(content).toString("base64");
    MailService.setApiKey(process.env.SEND_GRID_KEY);
    const lastYear = new Date().getFullYear() - 1;
    const recipients = process.env.SEND_GRID_TO.split(",");
    await Promise.all(
      recipients.map(async (to) => {
        await MailService.send({
          to: to,
          from: process.env.SEND_GRID_FROM,
          subject: `[GPE] - BACKUP FEEDBACKS ${lastYear}`,
          text: "E-mail de notificação de backup de feedbacks",
          attachments: [{ filename: fileName, content: base64 }],
        });
      })
    );
  }
}

export default NotificationDispatcher;
