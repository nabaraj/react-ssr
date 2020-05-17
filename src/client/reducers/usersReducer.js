import { FETCH_ARTICLES, LOADING_ARTICLES } from '../actions/index';
const initialState = {
  hits: [],
  nbPages: 0,
  currentPage: 0,
  loadingNews: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES:
      // return action.payload;
      return Object.assign({}, state, {
        ...state,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
        currentPage: action.payload.page
      })
    case LOADING_ARTICLES:
      return Object.assign({}, state, {
        ...state,
        loadingNews: action.payload
      })
    default:
      return state;
  }
};
