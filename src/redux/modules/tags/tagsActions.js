import { GET_TAGS } from './tagsActionConstants';
import * as insightsApi from '../../../api/insightsApi';

export const getTags = () => async dispatch => {
  const response = await insightsApi.getTags();

  if (response.status === 200) {
    const tags = {};
    response.data.forEach(tag => {
      tags[tag.TagKey] = { name: tag.TagName };
    });
    dispatch({ type: GET_TAGS, payload: tags });
  }
};
