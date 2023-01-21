import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2020-08-27',
  appInfo: {
    name: 'Chpokify',
    version: '0.0.1',
    url: 'https://chpokify.com',
  },
});

export {
  stripe,
};
