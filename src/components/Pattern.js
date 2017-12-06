import React from 'react';
import PropTypes from 'prop-types';
import SectionCard from 'components/SectionCard';
import AddSection from 'containers/AddSection';

const Pattern = ({ pattern, onIncClick }) => {
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
          {pattern.sections.map((section, index) => (
            <SectionCard
              key={index}
              {...section}
              onClick={() => onIncClick(index)}
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
    sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  })
};

export default Pattern;
