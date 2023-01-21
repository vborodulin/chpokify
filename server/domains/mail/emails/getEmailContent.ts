const fillTemplate = (tmpl: string, params: Record<string, any>) =>
  Object.entries(params).reduce((acc, [key, value]) => acc.replace(
    new RegExp(`{{${key}}}`, 'g'),
    value
  ),
  tmpl);

const getEmailContent = (txt: string, html: string, params: Record<string, any>) => ({
  txt: fillTemplate(txt, params),
  html: fillTemplate(html, params),
});

export {
  getEmailContent,
};
