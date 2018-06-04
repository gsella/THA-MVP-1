import { createSelector } from 'reselect';

const insightDatesInMilliseconds = insights => {
  const insightDates = insights.map(item => new Date(item.insightDate));

  return Math.max.apply(null, insightDates);
};

export const lastUpdatedInMilliseconds = createSelector(
  state => state,
  insightDatesInMilliseconds
);
