import { combineReducers } from 'redux';

const initialSection = (payload) => {

  const { sectionID, title, rows } = payload;

  return {
    title: title,
    sectionID: sectionID,
    rowDetails: new Array(Number(rows)),
    rowStatus: 5,
  };

};

function addSectionEntry(state, action) {

  const { payload } = action;
  const { sectionID } = payload;

  const section = initialSection(payload);

  return {
    ...state,
    [sectionID]: section,
  };
}

function sectionsByID(state = {}, action) {
  switch(action.type) {
    case 'ADD_SECTION':
      return addSectionEntry(state, action);
    default:
      return state;
  }
}

function addSectionID(state, action) {
  const { payload } = action;
  const { sectionID } = payload;
  return state.concat(sectionID);
}

function allSections(state = [], action) {
  switch(action.type) {
    case 'ADD_SECTION':
      return addSectionID(state, action);
    default:
      return state;
  }
}

const sectionsReducer = combineReducers({
  byID: sectionsByID,
  allIDs: allSections
});

export default sectionsReducer;
