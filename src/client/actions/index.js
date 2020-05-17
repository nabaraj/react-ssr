import axios from 'axios';

export const FETCH_ARTICLES = 'fetch_articles';
export const LOADING_ARTICLES = 'article_loading';

export const fetchArticles = source => async dispatch => {
  dispatch({
    type: LOADING_ARTICLES,
    payload: true,
  })
  let url = `https://hn.algolia.com/api/v1/search_by_date?page=1`
  // if (source) {
  //   url = `https://hn.algolia.com/api/v1/search_by_date?page=${pageNo}`;
  // } else {
  //   url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${config.apikey}`;
  // }

  const res = await axios.get(url);
  console.log('@@@@ ', res);
  dispatch({
    type: LOADING_ARTICLES,
    payload: false,
  })
  dispatch({
    type: FETCH_ARTICLES,
    payload: res.data
  });
};
