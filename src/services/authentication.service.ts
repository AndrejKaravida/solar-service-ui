import { Auth } from "aws-amplify";

export const cognitoSignIn = async (email: string, password: string) => {
  return await Auth.signIn(email, password);
};

export const cognitoSignOut = async () => {
  await Auth.signOut();
};

export const cognitoRegister = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  const signUpParams = {
    username: email,
    password,
    attributes: {
      given_name: firstName,
      family_name: lastName,
      email: email,
    },
  };
  return await Auth.signUp(signUpParams);
};

export const cognitoVerifyUser = async (
  userSub: string,
  verificationCode: string
) => {
  await Auth.confirmSignUp(userSub, verificationCode);
};

export const isLoggedIn = async () => {
  try {
    await Auth.currentAuthenticatedUser();
    return true;
  } catch (e) {
    return false;
  }
};

export const getCurrentUser = async () => {
  try {
    return Auth.currentAuthenticatedUser();
  } catch (e) {
    return null;
  }
};

export const getToken = async () => {
  let token = null;
  try {
    token = (await Auth.currentSession()).getIdToken().getJwtToken();
  } catch (e) {}
  return token;
};
