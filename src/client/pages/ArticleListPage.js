/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PropTypes from 'prop-types';
import ArticleDetailModal from '../components/ArticleDetailModal';
import { fetchArticles } from '../actions';
import { Link } from "react-router-dom";
import Loader from "./../components/loader";

const ArticleListPage = props => {
  const [modal, setModal] = useState(false);
  const [currentArticle, setCurrentArticle] = useState({});

  const readArticle = article => {
    setCurrentArticle(article);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const renderArticles = () => {
    return props.articles.hits.map(hit => (
      <tr key={hit.story_id}>
        <td>{hit.num_comments || 0}</td>
        <td>{hit.points || 0}</td>
        <td><i className="material-icons">arrow_drop_up</i></td>
        <td>{hit.title || hit.story_title || ""}</td>
      </tr>
    ));
  };

  const { articles, match } = props;

  const category = props && articles[0] && articles[0].source.name;

  const { fetchArticles: loadArticles } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (match.params.id) {
      loadArticles(match.params.id);
    } else {
      loadArticles();
    }
  }, [loadArticles, match.params.id]);

  const TableStructure = () => {
    console.log("asdf asdf", props.articles.currentPage)
    return <div>
      <table>
        <thead>
          <tr>
            <th>Comments</th>
            <th>Vote Count</th>
            <th>UpVote</th>
            <th>News Details</th>
          </tr>
        </thead>

        <tbody>
          {renderArticles()}
        </tbody>
      </table>
      <div className="right-align">
        <ul className="pagination">
          <li className={`${parseInt(match.params.id) <= 1 ? "disabled" : ""}`}>
            {parseInt(match.params.id) <= 1 ?
              null :
              <><Link to={`/articles/${parseInt(match.params.id) - 1}`}>Previous</Link>|</>}

          </li>
          <li className="waves-effect"><Link to={`/articles/${parseInt(match.params.id) + 1}`}>Next</Link></li>
        </ul>
      </div>
    </div>
  }


  if (props.articles.loadingNews) {
    return <div className="center-align">

      <Loader></Loader></div>
  }
  else {
    return <TableStructure></TableStructure>
  }

};

const mapStateToProps = state => {
  console.log("state ", state);

  return {
    articles: state.articles
  };
};

export default connect(
  mapStateToProps,
  { fetchArticles }
)(ArticleListPage);
