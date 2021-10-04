const key = process.env.KEY;
const endpoint = process.env.ENDPOINT;

const {
  TextAnalyticsClient,
  AzureKeyCredential,
} = require("@azure/ai-text-analytics"); 


const textAnalyticsClient = new TextAnalyticsClient(
  endpoint,
  new AzureKeyCredential(key)
);


module.exports = textAnalyticsClient;