import { createSelector } from 'reselect';
import { sortInsightsByCategoryAndOrder } from 'helper/apiDataSorter';

const calcInsightsKey = (insights, categories) => {
  if (categories && insights && insights.length > 0) {
    const categoryKeys = {};

    return insights
      .sort(sortInsightsByCategoryAndOrder(categories))
      .map(insight => {
        const newInsight = { ...insight };
        const categoryKey = categoryKeys[newInsight.categoryId];

        if (categoryKey) {
          newInsight.categoryKey =
            categories[newInsight.categoryId].abbreviation + categoryKey;
        } else {
          categoryKeys[newInsight.categoryId] = 1;
          newInsight.categoryKey =
            categories[newInsight.categoryId].abbreviation + 1;
        }
        categoryKeys[newInsight.categoryId]++;
        return newInsight;
      });
  }
  return insights;
};

export const insightsKeySelector = createSelector(
  (insights, categories) => insights,
  (insights, categories) => categories,
  calcInsightsKey
);
