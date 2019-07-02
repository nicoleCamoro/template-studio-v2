import { Value } from 'slate';

const initialState = {
  contractTemplateRef: null,
  markdown: '',
  slateValue: Value.fromJSON({
    object: 'value',
    document: {
      object: 'document',
      data: {},
      nodes: [{
        object: 'block',
        type: 'paragraph',
        data: {},
        nodes: [{
          object: 'text',
          text: 'Welcome to Template Studio! Edit this text to get started.',
          marks: []
        }],
      }]
    }
  }),
  clauses: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DOCUMENT_EDITED_SUCCESS':
      return {
        ...state,
        markdown: action.markdown,
        slateValue: action.slateValue,
      };
    case 'ADD_TO_CONTRACT_SUCCESS':
      return {
        ...state,
        clauses: {
          ...state.clauses,
          [action.clauseId]: {
            parseError: null,
            parseResult: null,
            clauseTemplateRef: action.clauseTemplateRef
          }
        }
      };
    case 'PARSE_CLAUSE_SUCEEDED':
      return {
        ...state,
        clauses: {
          ...state.clauses,
          [action.clauseId]: {
            ...state.clauses[action.clauseId],
            parseError: null,
            parseResult: action.parseResult
          }
        }
      };
    case 'PARSE_CLAUSE_ERROR':
      return {
        ...state,
        clauses: {
          ...state.clauses,
          [action.clauseId]: {
            ...state.clauses[action.clauseId],
            parseError: action.error,
            // would we rather the below be that last good result (if there is one)?
            parseResult: null,
          }
        }
      };
    default:
      return state;
  }
};

export default reducer;
