import generateId from 'uuid/v4';
import {
  requestPatternExpanded, receivePatternData,
  combinedFetchAction, MOCK_SERVER_URL
} from './asyncSetup';

// TODO: get rid of this here or in reducer (don't want in 2 places)
const initialPattern = ({ patternId, title }) => ({
  title,
  patternId,
  sectionIds: [],
  info: '<pattern info placeholder>',
});

// BASIC ACTION CREATOR
const combinedFetchPost = ({ requestAction, receiveAction, path, body }) =>
  combinedFetchAction({
    requestAction,
    receiveAction,
    path,
    body,
    requestType: 'POST',
    host: MOCK_SERVER_URL,
  });

export const createPattern = title => combinedFetchPost({
  requestAction: requestPatternExpanded,
  receiveAction: receivePatternData,
  body: { pattern: initialPattern({ patternId: generateId(), title }) },
  path: 'patterns'
});
