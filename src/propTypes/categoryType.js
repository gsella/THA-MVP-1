import PropTypes from 'prop-types';

export const categoryType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
});

// TODO: add normal validation
export const categoriesType = PropTypes.object;
