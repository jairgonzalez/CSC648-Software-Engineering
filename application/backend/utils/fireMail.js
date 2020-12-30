import settings from "../settings.js";

export default function makeFireMail(user, record) {
  const link = `${process.env.BASE_URL}infoPages/counties/${record.county_id}?type=Fire`;
  const messageText = `This email is sent to notify you that there is a fire of Alert Level ${settings.fireAlertLevel} \
  in ${record.county.name} For more information please visit ${link}.`;
  const messageHtml = `This email is sent to notify you that there is a fire of Alert Level ${settings.fireAlertLevel} \
  in ${record.county.name} For more information please visit <a href=${link}>${link}</a>.`;
  const message = {
    from: 'alerts@sfsucsc648.com',
    to: user.email,
    subject: `Fire alert for ${record.county.name}`,
    text: messageText,
    html: `<p>${messageHtml}</p>`
  }
  return message;
}
