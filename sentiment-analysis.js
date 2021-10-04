require("dotenv").config();
const textAnalyticsClient = require('./text-analytics-client');

async function sentimentAnalysis(text) {
  const client = textAnalyticsClient;
  const sentimentInput = [text];
  const sentimentResult = await client.analyzeSentiment(sentimentInput);

  let sentiment = [];
  let documentScores = { positive: 0, negative: 0, neutral: 0 };

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
    documentScores.positive = document.confidenceScores.positive.toFixed(2);
    documentScores.negative = document.confidenceScores.negative.toFixed(2);
    documentScores.neutral = document.confidenceScores.neutral.toFixed(2);
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
  return {sentiment,documentScores};
}

module.exports = sentimentAnalysis;
