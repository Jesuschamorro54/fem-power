import { userPool } from "src/credentials";

export const environment = {
  production: true,

  cognito: userPool,

  // For dev
  urlAPI: 'https://fn4cn7rdv3.execute-api.us-east-1.amazonaws.com/prod',
  redirectSignIn: 'http://127.0.0.1:4000/auth/sign',
  redirectSignOut: 'http://127.0.0.1:4000/auth/login',
  s3PublicUrl: 'https://fempower-public.s3.us-east-1.amazonaws.com/'
};
