require("dotenv").config();
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

async function sentimentAnalysis(text) {
  const client = textAnalyticsClient;
  const sentimentInput = [text];
  const sentimentResult = await client.analyzeSentiment(sentimentInput); 

  let sentiment = [];

  sentimentResult.forEach((document) => { 
    sentiment.push(document.sentiment);
    console.log(`ID: ${document.id}`);
    console.log(`\tDocument Sentiment: ${document.sentiment}`);
    console.log(`\tDocument Scores:`);
    console.log(
      `\t\tPositive: ${document.confidenceScores.positive.toFixed(
        2
      )} \tNegative: ${document.confidenceScores.negative.toFixed(
        2
      )} \tNeutral: ${document.confidenceScores.neutral.toFixed(2)}`
    );
    console.log(`\tSentences Sentiment(${document.sentences.length}):`);
    document.sentences.forEach((sentence) => {
      console.log(`\t\tSentence sentiment: ${sentence.sentiment}`);
      console.log(`\t\tSentences Scores:`);
      console.log(
        `\t\tPositive: ${sentence.confidenceScores.positive.toFixed(
          2
        )} \tNegative: ${sentence.confidenceScores.negative.toFixed(
          2
        )} \tNeutral: ${sentence.confidenceScores.neutral.toFixed(2)}`
      );
    });
  }); 
  return sentiment;
}

module.exports = sentimentAnalysis;
