/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PropTypes from 'prop-types'; // ES6
import { fetchArticles } from '../actions';
import ArticleDetailModal from '../components/ArticleDetailModal';

const HomePage = props => {
  const [modal, setModal] = useState(false);
  const [currentArticle, setCurrentArticle] = useState({});

  const readArticle = article => {
    setCurrentArticle(article);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };



  const { fetchArticles: loadArticles } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
    loadArticles();
  }, [loadArticles]);

  return (
    <div>
      {modal ? <ArticleDetailModal handler={closeModal} data={currentArticle} /> : null}
      <div className="row">
        <div className="section">
          <h3>Home</h3>
        </div>
        <div className="divider" />
        <div className="section">

        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    articles: state.articles
  };
};

HomePage.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.any),
  fetchArticles: PropTypes.func
};

HomePage.defaultProps = {
  articles: [],
  fetchArticles: null
};

export default connect(
  mapStateToProps,
  { fetchArticles }
)(HomePage);
