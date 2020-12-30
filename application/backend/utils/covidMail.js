import settings from "../settings.js";

export default function makeCovidMail(user, record) {
  const link = `${process.env.BASE_URL}infoPages/counties/${record.county_id}?type=Covid`;
  const messageText = `This email is sent to notify you that COVID cases in ${record.county.name} \
  have reached above ${settings.covidAlertRatio * 100}% of the total population. For more information \
  please visit ${link}.`;
  const messageHtml = `This email is sent to notify you that COVID cases in ${record.county.name} \
  have reached above ${settings.covidAlertRatio * 100}% of the total population. For more information \
  please visit <a href=${link}>${link}</a>.`
  const message = {
    from: 'alerts@sfsucsc648.com',
    to: user.email,
    subject: `COVID alert for ${record.county.name}`,
    text: messageText,
    html: `<p>${messageHtml}</p>`
  }
  return message;
}
