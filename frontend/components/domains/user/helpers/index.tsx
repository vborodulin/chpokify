const getUsernameView = (username: string, currUsername: string) => (username === currUsername
  ? `${username} (you)`
  : username);

const usersHelpers = {
  getUsernameView,
};

export {
  usersHelpers,
};
