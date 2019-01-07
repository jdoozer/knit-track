import { createAction, createActions } from 'redux-actions';

// SETUP ACTIONS

export const {
  requestPatterns, requestPatternExpanded, requestSectionExpanded
} = createActions(
  'REQUEST_PATTERNS', 'REQUEST_PATTERN_EXPANDED', 'REQUEST_SECTION_EXPANDED'
);

// export const addPattern = createAction(
//   'ADD_PATTERN',
//   title => ({
//     title,
//     patternId: generateId(),
//   })
// );

export const receivePattern = createAction(
  'RECEIVE_PATTERN',
  json => ({
    pattern: json.pattern,
    receivedAt: Date.now()
  })
);

export const receivePatterns = createAction(
  'RECEIVE_PATTERNS',
  json => ({
    patterns: json.patterns,
    receivedAt: Date.now()
  })
);

export const receivePatternExpanded = createAction(
  'RECEIVE_PATTERN_EXPANDED',
  json => ({
    pattern: json.pattern,
    sections: json.sections,
    rows: json.rows,
    receivedAt: Date.now()
  })
);

export const receiveSectionExpanded = createAction(
  'RECEIVE_SECTION_EXPANDED',
  json => ({
    section: json.section,
    rows: json.rows,
    receivedAt: Date.now()
  })
);
