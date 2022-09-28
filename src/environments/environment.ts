const backgendURL = '{BACKEND_URL}';

export const environment = {
  production: false,
  apiUrl: `${backgendURL}/admin`,
  publicUrl: `${backgendURL}`,
  csrf: `${backgendURL}/sanctum/csrf-cookie`,
  tiny_mce_key: '{process.env.TINY_MCE_KEY}',
  google_api_key: '{process.env.GOOGLE_API_KEY}',
};