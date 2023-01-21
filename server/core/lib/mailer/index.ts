import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { log } from '@core/lib/logger';

let mailer: Mail;

const initMailer = async () => {
  mailer = await nodemailer.createTransport({
    // @ts-ignore
    host: process.env.SMTP_HOST as string,
    port: process.env.SMTP_PORT as string,
    replyTo: 'info@chpokify.com',
    secure: process.env.SMTP_SECURE === 'true',
    ignoreTLS: process.env.SMTP_SECURE !== 'true',
    auth: {
      user: process.env.SMTP_USERNAME as string,
      pass: process.env.SMTP_PASSWORD as string,
    },
  });

  log.info({ methodName: 'initMailer' }, 'mailer transport created');
};

export { mailer, initMailer };
