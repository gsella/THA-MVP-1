import { createSelector } from 'reselect';
import { sortInsightsByCategoryAndOrder } from 'helper/apiDataSorter';

const calcInsightsKey = (insights, categories) => {
  if (categories && insights && insights.length > 0) {
    const categoryKeys = {};

    return insights
      .sort(sortInsightsByCategoryAndOrder(categories))
      .map(insight => {
        const categoryKey = categoryKeys[insight.categoryId];

        if (categoryKey) {
          insight.categoryKey =
            categories[insight.categoryId].abbreviation + categoryKey;
        } else {
          categoryKeys[insight.categoryId] = 1;
          insight.categoryKey = categories[insight.categoryId].abbreviation + 1;
        }
        categoryKeys[insight.categoryId]++;
        return insight;
      });
  }
  return insights;
};

export const insightsKeySelector = createSelector(
  (insights, categories) => insights,
  (insights, categories) => categories,
  calcInsightsKey
);
