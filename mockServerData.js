
exports.patterns = {
  byId: {
    'f797d396-9949-4626-9dd3-0f2e8304a0c7': {
      patternId: 'f797d396-9949-4626-9dd3-0f2e8304a0c7',
      title: 'My Pattern',
      info: 'pattern info placeholder',
      sectionIds: [
        'e1aa9ab9-7596-4e24-8e45-05b035e3b366',
        '6dac4f64-e860-48e4-8203-8c22d4fd0503',
        'd8dd7926-3a3e-4ed7-8856-bd6fed314943'
      ]
    },
    '6a9b3a2f-605c-4b46-b403-91077d59400b': {
      patternId: '6a9b3a2f-605c-4b46-b403-91077d59400b',
      info: 'pattern info placeholder',
      title: 'here is another pattern',
      sectionIds: [
        '9887826c-b53a-4ac3-b6e7-c9a0268aaf7d'
      ]
    }
  },
  allIds: [
    'f797d396-9949-4626-9dd3-0f2e8304a0c7',
    '6a9b3a2f-605c-4b46-b403-91077d59400b'
  ]
};

exports.sections = {
  byId: {
    'e1aa9ab9-7596-4e24-8e45-05b035e3b366': {
      title: 'My Section',
      sectionId: 'e1aa9ab9-7596-4e24-8e45-05b035e3b366',
      patternId: 'f797d396-9949-4626-9dd3-0f2e8304a0c7',
      numRows: 4,
      currentRow: 1,
      rows: {
        1: {
          fullText: 'instructions here',
          quickText: 'alert here',
          stitches: '50'
        },
      }
    },
    '6dac4f64-e860-48e4-8203-8c22d4fd0503': {
      title: 'Section with Many Rows',
      sectionId: '6dac4f64-e860-48e4-8203-8c22d4fd0503',
      patternId: 'f797d396-9949-4626-9dd3-0f2e8304a0c7',
      numRows: 120,
      currentRow: 12,
      rows: {
        10: {
          fullText: 'instructions here',
          quickText: 'alert here',
          stitches: '85'
        },
        24: {
          fullText: 'instructions here',
          quickText: 'alert here',
          stitches: '85'
        },
      },
    },
    'd8dd7926-3a3e-4ed7-8856-bd6fed314943': {
      title: 'new section',
      sectionId: 'd8dd7926-3a3e-4ed7-8856-bd6fed314943',
      patternId: 'f797d396-9949-4626-9dd3-0f2e8304a0c7',
      numRows: 3,
      currentRow: 1,
      rows: {},
    },
    '9887826c-b53a-4ac3-b6e7-c9a0268aaf7d': {
      title: 'new section',
      sectionId: '9887826c-b53a-4ac3-b6e7-c9a0268aaf7d',
      patternId: '6a9b3a2f-605c-4b46-b403-91077d59400b',
      numRows: 2,
      currentRow: 1,
      rows: {
        1: {
          fullText: 'row 1 instructions here',
          quickText: '',
          stitches: '10'
        },
        2: {
          fullText: 'row 2 instructions here',
          quickText: '',
          stitches: '10'
        }
      }
    }
  },
  allIds: [
    'e1aa9ab9-7596-4e24-8e45-05b035e3b366',
    '6dac4f64-e860-48e4-8203-8c22d4fd0503',
    'd8dd7926-3a3e-4ed7-8856-bd6fed314943',
    '9887826c-b53a-4ac3-b6e7-c9a0268aaf7d'
  ]
};
