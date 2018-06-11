import {
  createSelector,
  createSelectorCreator,
  defaultMemoize,
} from 'reselect';
import { sortInsightsByCategoryAndOrder } from 'helper/apiDataSorter';

const calcInsightsKey = (insights, categories) => {
  if (categories && insights && insights.length > 0) {
    return insights

      .map(insight => {
        const newInsight = { ...insight };

        if ('categoryId' in newInsight && newInsight.categoryId) {
          newInsight.categoryKey =
            categories[newInsight.categoryId].abbreviation + newInsight.order;
        }
        return newInsight;
      })
      .sort(sortInsightsByCategoryAndOrder(categories));
  }
  return insights;
};

/**
 * Compare insights by category, order should stay the same
 * @param {Array} oldValues array of old insights
 * @param {Array} newValues array of new inssights
 */
const AreInsightsEqualByCategory = (oldValues, newValues) => {
  if (oldValues.length !== newValues.length) return false;

  for (let i = 0; i < oldValues.length; i++) {
    const oldInsight = oldValues[i];
    const newInsight = newValues[i];

    if (
      oldInsight.categoryId !== newInsight.categoryId ||
      oldInsight.id !== newInsight.id ||
      oldInsight.order !== newInsight.order
    ) {
      return false;
    }
  }
  return true;
};

const createInsightSelector = createSelectorCreator(
  defaultMemoize,
  AreInsightsEqualByCategory
);

const insightSelector = createInsightSelector(
  insights => insights,
  insights => insights
);

export const insightsKeySelector = createSelector(
  insightSelector,
  (insights, categories) => categories,
  calcInsightsKey
);
