import React from 'react';
import PropTypes from 'prop-types';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/components/tags-sections.css';

const tagSectionClass = 'tags-sections';
const bemClasses = getBEMClasses([tagSectionClass]);

const TagSection = ({ tags, size }) => (
  <div className={bemClasses()} style={{ width: size * tags.length }}>
    {tags.map(tag => (
      <div
        className={bemClasses('item')}
        key={tag.name}
        style={{ width: size }}>
        {tag.name}
      </div>
    ))}
  </div>
);

TagSection.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ).isRequired,
  size: PropTypes.number.isRequired,
};

export default TagSection;
