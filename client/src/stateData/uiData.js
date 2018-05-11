import { initialStateUi } from 'stateData/initialState';

export const patternId = 'patternIdString';
export const sectionId = 'sectionIdString';

export const initialState = initialStateUi;

export const pattern = {
  selectedPattern: patternId,
  sectionToEdit: null,
};

export const section = {
  selectedPattern: null,
  sectionToEdit: sectionId,
};

export const patternSection = {
  selectedPattern: patternId,
  sectionToEdit: sectionId,
};
