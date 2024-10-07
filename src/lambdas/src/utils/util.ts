import axios from 'axios';

require('dotenv').config(); // Load environment variables

const API_URLS = {
  API_1: "https://hpcs-crm-itg.hpcloud.hp.com/v1/telephony",
  API_2: "https://uids.hpcloud.hp.com/uids/V1/inference"
};

const AUTH_URLS = {
  API_1: "https://login-itg.external.hp.com/as/token.oauth2",
  API_2: "https://css.api.hp.com/oauth/accesstoken"
};

const CLIENT_CREDENTIALS = {
  API_1: {
    clientId: process.env.clientId1,
    clientSecret: process.env.clientSecret1
  },
  API_2: {
    clientId: process.env.clientId2,
    clientSecret: process.env.clientSecret2
  }
};

// Utility functions for API token generation
export const getValidatePhoneAuthToken = async () => {
  try {
    const { clientId, clientSecret } = CLIENT_CREDENTIALS.API_1;
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);

    const response = await axios.post(AUTH_URLS.API_1, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    console.log("Token1:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(`API 1 token generation failed: ${error.message}`);
  }
};

export const getUIDSAuthToken = async () => {
  try {
    const { clientId, clientSecret } = CLIENT_CREDENTIALS.API_2;
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);

    const response = await axios.post(AUTH_URLS.API_2, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log("Token2:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(`API 2 token generation failed: ${error.message}`);
  }
};
