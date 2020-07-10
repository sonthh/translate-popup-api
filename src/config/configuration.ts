export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  oxford: {
    apiKey: process.env.OXFORD_API_KEY,
    appId: process.env.OXFORD_APP_ID,
    apiUrl: process.env.OXFORD_API_URL,
  },
});