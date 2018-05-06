import axios from 'axios';
import { getApiBaseUrl } from '../helper/apiHelper';

export const getInsights = async thunderkey => {
  const url = getApiBaseUrl('/Insight');
  const response = await axios.get(url, {
    params: {
      thunderkey
    }
  });

  const result = {
    status: response.status,
    data: []
  };

  if (!response.status === 200) {
    return result;
  }

  result.data = response.data.list;

  return result;
};
