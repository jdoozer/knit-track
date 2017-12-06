
export function addPattern(title) {
  return { type: 'ADD_PATTERN', title }
}

export function selectPattern(index) {
  return { type: 'SELECT_PATTERN', index }
}

export function addSection(title, rows) {
  return { type: 'ADD_SECTION', title, rows }
}

export function updateCount(sectionIndex, updateType) {
  return { type: 'UPDATE_COUNT', sectionIndex, updateType }
}
