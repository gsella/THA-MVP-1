export const mapInsightFromApi = insight => {
  return {
    id: insight.InsightKey,
    //TODO: it will be remove when server will ready
    categoryId: insight.Categorykey,
    tagId: insight.Tagkey === 0 ? 1 : insight.Tagkey,
    categoryKey: insight.InsightID,
    insight: insight.InsightName,
    impact: insight.InsightImpact,
    instances: insight.InsightSize,
    description: insight.InsightDescription || '',
    order: insight.InsightOrder,
    isActive: insight.isActive,

    // fields that can be modified on server side only
    popularity: insight.InsightPopularity,
  };
};

export const mapInsightsFromPUTApi = insight => {
  return {
    id: insight.InsightKey,
    categoryId: insight.CategoryKey,
    tagId: insight.TagKey === 0 ? 1 : insight.TagKey,
    categoryKey: insight.InsightId,
    insight: insight.InsightName,
    impact: insight.Impact,
    instances: insight.Size,
    description: insight.Description || '',
    order: insight.InsightOrder,
    isActive: insight.IsActive,

    // fields that can be modified on server side only
    popularity: insight.Popularity,
  };
};

export const mapThundersFromApi = thunder => {
  return {
    id: thunder.ThunderId,
    thunderKey: thunder.ThunderKey,
    name: thunder.ThunderName,
    description: thunder.ThundreDescription,
    // TODO need actual data for that
    dateCreated: new Date(),
    author: 'Noy Bar',
    isActive: true,
  };
};
