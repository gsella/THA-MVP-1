import axios from 'axios';
import { getApiBaseUrl } from '../helper/apiHelper';

export const getThunders = async () => {
  const url = getApiBaseUrl('/Thunder');
  const response = await axios.get(url);

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
