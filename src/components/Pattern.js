import React from 'react';
import PropTypes from 'prop-types';
import SectionCard from 'components/SectionCard';
import AddSection from 'containers/AddSection';


/* NEED TO UPDATE PatternContainer TO ONLY PASS RELEVANT SECTIONS */

/*
{sections.map(section => (
  <SectionCard
    key={section.sectionID}
    {...section}
    onClick={() => onIncClick(section.sectionID)}
  />
))}

*/

const Pattern = ({ pattern, onIncClick, sections }) => {
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
              onClick={() => onIncClick(section.sectionID)}
            />
          ))}
        </ul>
        <AddSection />
      </div>
    );
  }
};

Pattern.propTypes = {
  pattern: PropTypes.shape({
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    sections: PropTypes.shape({
      byID: PropTypes.object.isRequired,
      allIDs: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
  })
};

export default Pattern;
