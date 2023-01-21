import { isServer } from '@chpokify/helpers';
import axios, { AxiosError } from 'axios';
import { IncomingMessage, ServerResponse } from 'http';

const baseUrl = isServer() ? process.env.BASE_API_SSR_URL : process.env.BASE_API_CLIENT_URL || '';

const api = axios.create({
  baseURL: `${baseUrl}/api`,
  timeout: 5000,
  withCredentials: true,
  maxRedirects: 2,
});

let currSSRRequest: IncomingMessage | undefined;
let currentSSRResponse: ServerResponse | undefined;

const setCurrSSRRequest = (req?: IncomingMessage) => {
  currSSRRequest = req;
};

const setCurrSSRResponse = (res?: ServerResponse) => {
  currentSSRResponse = res;
};

api.interceptors.request.use(
  (config) => {
    if (isServer() && currSSRRequest) {
      const requestCookie = currSSRRequest.headers.cookie;

      if (requestCookie && config.headers) {
        config.headers.Cookie = requestCookie;
      }
    }

    return config;
  },
  (err) => Promise.reject(err)
);

api.interceptors.response.use(
  (response) => {
    if (isServer() && currentSSRResponse) {
      const apiResponseSetCookie = response.headers['set-cookie'];

      if (apiResponseSetCookie) {
        currentSSRResponse.setHeader('set-cookie', apiResponseSetCookie);
      }
    }

    return response;
  },
  (error: AxiosError) => {
    if (isServer() && currentSSRResponse) {
      if (error.response) {
        const apiResponseSetCookie = error.response.headers['set-cookie'];

        if (apiResponseSetCookie) {
          currentSSRResponse.setHeader('set-cookie', apiResponseSetCookie);
        }
      }
    }

    return Promise.reject(error);
  }
);

export {
  api,
  setCurrSSRRequest,
  setCurrSSRResponse,
  baseUrl,
};
