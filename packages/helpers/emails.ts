const getUsername = (email: string = '') => email.split('@')[0];

const emailHelpers = {
  getUsername,
};

export {
  emailHelpers,
};
