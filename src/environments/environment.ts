const backgendURL = '{BACKEND_URL}';

export const environment = {
  production: true,
  apiUrl: `${backgendURL}/admin`,
  publicUrl: `${backgendURL}`,
  csrf: `${backgendURL}/sanctum/csrf-cookie`,
  tiny_mce_key: '{TINY_MCE_KEY}',
  google_api_key: '{GOOGLE_API_KEY}',
};
