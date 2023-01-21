declare module '*.html' {
  const value: string;
  export default value;
}

declare module '*.txt' {
  const value: string;
  export default value;
}

declare module 'passport-google-oauth20';

declare module NodeJS {
  interface Global {
    __rootdir__: string;
  }
}
