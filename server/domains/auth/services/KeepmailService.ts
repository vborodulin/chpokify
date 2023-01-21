import axios from 'axios';

import { BadRequestError, UnauthorizedError } from '@core/lib/errors';

const api = axios.create({
  baseURL: 'https://keepmail.xyz/api/oauth',
  timeout: 5000,
  withCredentials: false,
  maxRedirects: 2,
});

type TGetTokenResp = {
  'access_token': string;
  'token_type': 'Bearer',
  'created_at': string;
};

const getToken = async (code: string, redirectUri: string) => {
  try {
    const resp = await api.post<TGetTokenResp>('/token', {
      client_id: 1,
      client_secret: 'secret',
      code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    });

    return resp.data;
  } catch {
    throw new UnauthorizedError('Unauthorized');
  }
};

type TGetUserInfoResp = {
  email: string;
};

const getUserInfo = async (token) => {
  try {
    const resp = await api.get<TGetUserInfoResp>('/userinfo', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return resp.data;
  } catch {
    throw new BadRequestError('Bad request');
  }
};

const keepmailService = {
  getToken,
  getUserInfo,
};

export {
  keepmailService,
};
