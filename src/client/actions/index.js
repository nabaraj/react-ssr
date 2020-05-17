import axios from 'axios';

export const FETCH_ARTICLES = 'fetch_articles';
export const LOADING_ARTICLES = 'article_loading';
export const HIDE_ROW = 'hide_row';
export const UP_VOTE = 'up_vote';

export const fetchArticles = source => async dispatch => {
  dispatch({
    type: LOADING_ARTICLES,
    payload: true,
  })
  let url = `https://hn.algolia.com/api/v1/search_by_date?page=${source}`


  const res = await axios.get(url);
  dispatch({
    type: LOADING_ARTICLES,
    payload: false,
  })
  dispatch({
    type: FETCH_ARTICLES,
    payload: res.data
  });
};
export const hideRow = (id) => dispatch => {
  dispatch({
    type: HIDE_ROW,
    payload: id
  })
}
export const upVote = (id) => dispatch => {
  dispatch({
    type: UP_VOTE,
    payload: id
  })
}
