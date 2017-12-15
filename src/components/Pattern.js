import React from 'react';
import PropTypes from 'prop-types';
import SectionCard from 'components/SectionCard';
import AddSection from 'containers/AddSection';

const Pattern = ({ pattern, sections }) => {
  if (pattern == null) {
    return (
      <div>No pattern selected!</div>
    );
  } else {
    return(
      <div>
        <h2>{pattern.title}</h2>
        <p>{pattern.info}</p>
        <ul>
          {sections.map(section => (
            <SectionCard
              key={section.sectionID}
              {...section}
            />
          ))}
        </ul>
        <AddSection patternID={pattern.patternID} />
      </div>
    );
  }
};

Pattern.propTypes = {
  pattern: PropTypes.shape({
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
  }),
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      sectionID: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default Pattern;
