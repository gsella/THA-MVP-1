import React from 'react';
import PropTypes from 'prop-types';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/tags-sections.css';

const tags = 'tags-sections';
const bemClasses = getBEMClasses([tags]);

const TagSection = ({ tags }) => (
  <div className={bemClasses()}>
    {tags &&
      tags.map(tag => (
        <div className={bemClasses('item')} key={tag.name}>
          {tag.name}
        </div>
      ))}
  </div>
);

TagSection.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ).isRequired,
};

export default TagSection;
