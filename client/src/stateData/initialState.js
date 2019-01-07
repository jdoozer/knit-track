export const initialStateNormal = {
  byId: {},
  allIds: [],
  loading: false,
};

export const initialStateUi = {
  selectedPattern: null,
  sectionToEdit: null
};

export const initialStateFull = {
  patterns: initialStateNormal,
  sections: initialStateNormal,
  rows: initialStateNormal,
  ui: initialStateUi
}
