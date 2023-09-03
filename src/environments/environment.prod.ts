import { userPool } from "src/credentials";

export const environment = {
  production: true,

  cognito: userPool,

  // For dev
  urlAPI: 'https://fn4cn7rdv3.execute-api.us-east-1.amazonaws.com/prod',
  redirectSignIn: 'https://v4.d3k16gz7n4mced.amplifyapp.com/',
  redirectSignOut: 'https://v4.d3k16gz7n4mced.amplifyapp.com/',
};
