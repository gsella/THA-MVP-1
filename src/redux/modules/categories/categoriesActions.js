import { GET_CATEGORIES } from './categoriesActionConstants';
import * as insightsApi from '../../../api/insightsApi';

export const getCategories = () => async dispatch => {
  const response = await insightsApi.getCategories();

  if (response.status === 200) {
    const categories = {};
    response.data.forEach(category => {
      categories[category.CategoryKey] = {
        id: category.CategoryKey,
        name: category.CategoryName,
        color: category.Colour,
        abbreviation: category.letter,
      };
    });

    dispatch({ type: GET_CATEGORIES, payload: categories });
  }
};
