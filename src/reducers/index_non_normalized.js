
const initialState = {
  selectedPattern: null,
  patterns: []
}

const initialPattern = (title) => ({
  title: title,
  sections: [],
  info: `here's some pattern info`
});

const initialSection = (title, rows) => ({
  title: title,
  rowDetails: new Array(Number(rows)),
  rowStatus: 5
});

const initialRow = (number) => ({
  num: number,
  fullText: '',
  alertText: '',
  stitches: null
});

function knitTrack(state = initialState, action) {
  switch (action.type) {
    case 'ADD_PATTERN':
      return Object.assign({}, state, {
        patterns: [
          ...state.patterns,
          initialPattern(action.title)
        ]
      });
    case 'SELECT_PATTERN':
      return Object.assign({}, state, {
        selectedPattern: action.index
      });
    case 'ADD_SECTION':
      return Object.assign({}, state, {
        patterns: state.patterns.map((pattern, index) => {
          if (index === state.selectedPattern) {
            return Object.assign({}, pattern, {
              sections: [
                ...pattern.sections,
                initialSection(action.title, action.rows)
              ]
            });
          }
          return pattern;
        })
      });
    case 'UPDATE_COUNT':
      return Object.assign({}, state, {
        patterns: state.patterns.map((pattern, index) => {
          if (index === state.selectedPattern) {
            return Object.assign({}, pattern, {
              sections: pattern.sections.map((section, sectionIndex) => {
                if (sectionIndex === action.sectionIndex) {
                  switch (action.updateType) {
                    case 'INCREASE':
                      return Object.assign({}, section, {
                        rowStatus: section.rowStatus + 1
                      });
                    case 'DECREASE':
                      return Object.assign({}, section, {
                        rowStatus: section.rowStatus - 1
                      });
                    case 'RESET':
                      return Object.assign({}, section, {
                        rowStatus: 0
                      });
                    default:
                      break;
                  }
                }
                return section;
              })
            });
          }
          return pattern;
        })
      });
    default:
      return state;
  }
}


export default knitTrack;
