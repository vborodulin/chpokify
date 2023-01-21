const getOauthUrl = (clientId: string, redirectUri: string) =>
  `https://keepmail.xyz/oauth/identify?response_type=code&scope=email&client_id=${clientId}&redirect_uri=${redirectUri}`;

const keepmail = {
  getOauthUrl,
};

export {
  keepmail,
};
