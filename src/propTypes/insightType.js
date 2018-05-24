import PropTypes from 'prop-types';

export const insightType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  categoryId: PropTypes.number.isRequired,
  categoryKey: PropTypes.string.isRequired,
  tagId: PropTypes.number.isRequired,
  insight: PropTypes.string.isRequired,
  impact: PropTypes.number.isRequired,
  instances: PropTypes.number.isRequired,
  description: PropTypes.string,
});

export const insightsType = PropTypes.arrayOf(insightType);
