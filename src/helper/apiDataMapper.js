export const mapInsightFromApi = insight => {
  return {
    id: insight.InsightKey,
    categoryId: insight.Categorykey,
    tagId: insight.Tagkey,
    categoryKey: insight.InsightID,
    insight: insight.InsightName,
    popularity: insight.InsightPopularity,
    instances: insight.InsightSize,
    description: insight.InsightDescription,
  };
};
