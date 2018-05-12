import { createSelector } from 'reselect';

const calcInsightsKey = insights => {
  if (insights && insights.length > 0) {
    const categoryKeys = {};
    return insights.map(insight => {
      const categoryKey = categoryKeys[insight.categoryId];

      if (categoryKey) {
        insight.categoryKey = categoryKey;
      } else {
        categoryKeys[insight.categoryId] = 1;
        insight.categoryKey = 1;
      }
      categoryKeys[insight.categoryId]++;
      return insight;
    });
  }
  return insights;
};

export const insightsKeySelector = createSelector(
  insights => insights,
  calcInsightsKey
);
