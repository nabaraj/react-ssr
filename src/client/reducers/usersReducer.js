import { FETCH_ARTICLES, LOADING_ARTICLES, HIDE_ROW, UP_VOTE } from '../actions/index';
let localHidenItems = window.localStorage.getItem("hiddenItems");
let localUpVote = window.localStorage.getItem("upVoteObject");

const initialState = {
  hits: [],
  nbPages: 0,
  currentPage: 0,
  loadingNews: false,
  hiddenItems: localHidenItems ? localHidenItems.split(',').map(i => Number(i)) : [],
  upVote: localUpVote ? JSON.parse(localUpVote) : {},
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
    case HIDE_ROW:
      // console.log('HIDE_ROW');
      let localItems = window.localStorage.getItem("hiddenItems");
      localItems = localItems ? localItems.split(',').map(i => Number(i)) : [];
      localItems.push(action.payload);
      localStorage.setItem("hiddenItems", localItems);
      return Object.assign({}, state, {
        ...state,
        hiddenItems: [...state.hiddenItems, action.payload]
      })
    case UP_VOTE:

      let upVoteLocal = window.localStorage.getItem("upVoteObject");
      upVoteLocal = upVoteLocal ? JSON.parse(upVoteLocal) : {};
      upVoteLocal = increaseItem(upVoteLocal, action.payload);

      localStorage.setItem("upVoteObject", JSON.stringify(upVoteLocal));
      return Object.assign({}, state, {
        ...state,
        upVote: { ...state.upVote, ...upVoteLocal }
      })
    default:
      return state;
  }
};
const increaseItem = (upVote, item) => {
  if (!upVote[item]) {
    upVote[item] = 0;
  }
  upVote[item] = upVote[item] + 1;
  return upVote;
}