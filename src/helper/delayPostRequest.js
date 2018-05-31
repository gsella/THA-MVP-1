import * as insightsApi from '../api/insightsApi';

async function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

async function delayPostRequest(createdInsights) {
  let result = [];
  for (let i = 0; i < createdInsights.length; i++) {
    result.push(await insightsApi.addInsight(createdInsights[i]));
    await delay(3000);
  }

  return result.map(i => Promise.resolve(i));
}

export default delayPostRequest;
