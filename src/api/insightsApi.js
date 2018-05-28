import axios from 'axios';
import { getApiBaseUrl } from '../helper/apiHelper';

export const getInsights = async (thunderkey, endDate) => {
  const url = getApiBaseUrl('/Insight');
  const response = await axios.get(url, {
    params: {
      thunderkey,
      startDate: '1970-01-01',
      endDate,
    },
  });

  const result = {
    status: response.status,
    data: [],
  };

  if (!response.status === 200) {
    return result;
  }

  result.data = response.data.list;

  return result;
};

export const getNewInsights = async (thunderkey, startDate, endDate) => {
  const url = getApiBaseUrl('/Insight');
  const response = await axios.get(url, {
    params: {
      thunderkey,
      startDate,
      endDate,
    },
  });

  const result = {
    status: response.status,
    data: [],
  };

  if (!response.status === 200) {
    return result;
  }

  result.data = response.data.list;

  return result;
};

export const updateInsights = async (ThunderKey = 4, insights) => {
  const url = getApiBaseUrl('/Insight');
  const mappedInsights = insights.map(insight => ({
    ThunderKey,
    InsightKey: insight.id,
    Scale: '0.0',
    Popularity: insight.popularity,
    Description: insight.description,
    Size: insight.instances,
    InsightName: insight.insight,
    TagKey: insight.tagId,
    CategoryKey: insight.categoryId,
    InsightOrder: insight.order,
    Impact: insight.impact,
    IsActive: insight.isActive,
  }));

  const response = await axios.put(url, mappedInsights);

  return response;
};

export const addInsight = async insight => {
  const url = getApiBaseUrl('/Insight');
  const params = {
    insightName: insight.insight,
    insightScale: '0.0',
    insightCategoryKey: insight.categoryId || 0,
    insightPopularity: 0,
    insightDescription: insight.description,
    insightSize: 1,
    words: insight.insight,
    insightTagKey: insight.tagId || 0,
    CategoryKey: insight.categoryId || 0,
    thunderkey: 4,
    insightDate: insight.insightDate,
    insightOrder: insight.order || 0,
    insightImpact: insight.impact,
    isActive: insight.isActive,
  };
  if (insight.insightId.length > 0) params.insightId = insight.insightId;

  const response = await axios.post(
    url,
    {},
    {
      params,
    }
  );

  return response;
};
