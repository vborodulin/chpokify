import fs from 'fs';
import jwt, { JwtHeader, SigningKeyCallback, VerifyErrors } from 'jsonwebtoken';
import fetch from 'node-fetch';
import NodeRSA from 'node-rsa';

const ENDPOINT_URL = 'https://appleid.apple.com';
const DEFAULT_EXP_TIME = 300;

/**
 * Apple keys cache
 * { kid: public_key }
 */
let APPLE_KEYS_CACHE: Record<string, string> = {};

export type TAppleIdTokenType = {
  iss: string,
  sub: string,
  aud: string,
  exp: string,
  iat: string,
  nonce: string,
  // eslint-disable-next-line camelcase
  nonce_supported: boolean,
  email: string,
  // eslint-disable-next-line camelcase
  email_verified: 'true' | 'false' | boolean,
  // eslint-disable-next-line camelcase
  is_private_email: 'true' | 'false' | boolean,
};

const _getApplePublicKeys = async ({
  disableCaching,
}: { disableCaching?: boolean } = {}) => {
  const url = new URL(ENDPOINT_URL);
  url.pathname = '/auth/keys';

  // Fetch Apple's Public keys
  const data = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  // Reset cache - will be refilled below
  APPLE_KEYS_CACHE = {};

  // Parse and cache keys
  const keyValues = data.keys.map((key) => {
    // parse key
    const publKeyObj = new NodeRSA();
    publKeyObj.importKey(
      { n: Buffer.from(key.n, 'base64'), e: Buffer.from(key.e, 'base64') },
      'components-public'
    );
    const publicKey = publKeyObj.exportKey('public');

    // cache key
    if (!disableCaching) {
      APPLE_KEYS_CACHE[key.kid] = publicKey;
    }

    // return public key string
    return publicKey;
  });

  // Return parsed keys
  return keyValues;
};

/** Gets the Apple Public Key corresponding to the JSON's header  */
const _getIdTokenApplePublicKey = async (
  header: JwtHeader,
  cb: SigningKeyCallback
) => {
  // attempt fetching from cache
  if (header.kid && APPLE_KEYS_CACHE[header.kid]) {
    return cb(null, APPLE_KEYS_CACHE[header.kid]);
  }

  // fetch and cache current Apple public keys
  await _getApplePublicKeys();

  // attempt fetching from cache
  if (header.kid && APPLE_KEYS_CACHE[header.kid]) {
    return cb(null, APPLE_KEYS_CACHE[header.kid]);
  }

  return cb(new Error('input error: Invalid id token public key id'));
};

type TGetClientSecretOptions = {
  clientId: string;
  teamId: string;
  keyIdentifier: string;
  privateKey?: string;
  privateKeyPath?: string;
  expAfter?: number;
};

const getClientSecret = async (options: TGetClientSecretOptions): Promise<string> => {
  const {
    clientId,
    teamId,
    keyIdentifier,
    privateKey,
    privateKeyPath,
    expAfter,
  } = options;

  if (!clientId) {
    throw new Error('clientID is empty');
  }

  if (!teamId) {
    throw new Error('teamId is empty');
  }

  if (!keyIdentifier) {
    throw new Error('keyIdentifier is empty');
  }

  if (!privateKey && !privateKeyPath) {
    throw new Error('privateKey and privateKeyPath is empty');
  }

  if (privateKey && privateKeyPath) {
    throw new Error('privateKey and privateKeyPath cant be passed together, choose one of them');
  }

  if (privateKeyPath && !fs.existsSync(privateKeyPath)) {
    throw new Error('Cant find private key');
  }

  const timeNow = Math.floor(Date.now() / 1000);

  const claims = {
    iss: options.teamId,
    iat: timeNow,
    exp: timeNow + (expAfter || DEFAULT_EXP_TIME),
    aud: ENDPOINT_URL,
    sub: options.clientId,
  };

  const header = {
    alg: 'ES256',
    kid: options.keyIdentifier,
  };

  const key = options.privateKeyPath
    ? fs.readFileSync(options.privateKeyPath)
    : options.privateKey;

  if (!key) {
    throw new Error('Private key is empty');
  }

  return jwt.sign(
    claims,
    key,
    { algorithm: 'ES256', header }
  );
};

const verifyIdToken = async (
  idToken: string,
  /**
   * JWT verify options -
   * Full list here https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
   */
  options: Record<string, any> = {}
) => new Promise<TAppleIdTokenType | undefined>((resolve, reject) => {
  jwt.verify(
    idToken,
    _getIdTokenApplePublicKey,
    {
      algorithms: ['RS256'],
      issuer: ENDPOINT_URL,
      ...options,
    },
    (
      err: VerifyErrors | null,
      decoded: TAppleIdTokenType | undefined
    ) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    }
  );
});

const appleAuth = {
  getClientSecret,
  verifyIdToken,
};

export {
  appleAuth,
};
