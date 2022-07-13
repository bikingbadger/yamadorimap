import { Auth0Plugin } from '../auth/auth0-plugin.js'

const authHeader = async () => {
  try {
    const token = await Auth0Plugin.getAccessTokenSilently();
    if (token) {
      return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      };
    } else {
      return {};
    }
  } catch (err) {
    console.log(err);
  }
};

const noAuthHeader = () => {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
};

export { authHeader, noAuthHeader };
