import PropTypes from 'prop-types';

export const insightType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  categoryId: PropTypes.number.isRequired,
  tagId: PropTypes.number.isRequired,
  categoryKey: PropTypes.string.isRequired,
  insight: PropTypes.string.isRequired,
  popularity: PropTypes.number.isRequired,
  instances: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
});

// TODO: add normal validation
export const insightsType = PropTypes.arrayOf(insightType);
