export const GOOGLE = "google";
export const EMAIL_PASSWORD = "email_password";
export const PASSWORDLESS = "passwordless";

export const AUTH_DOMAIN = "https://torus-test.auth0.com";

export const verifierMap = {
  [GOOGLE]: {
    name: "Google",
    typeOfLogin: "google",
    clientId: "609205611685-6akuv3v95pfcp8aggsg6ph3kbfc4iaat.apps.googleusercontent.com",
    verifier: "tradewave-google-lrc",
  },
  [EMAIL_PASSWORD]: {
    name: "Email Password",
    typeOfLogin: "email_password",
    clientId: "sqKRBVSdwa4WLkaq419U7Bamlh5vK1H7",
    verifier: "torus-auth0-email-password",
  },
} as Record<string, any>;
