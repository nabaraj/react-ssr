/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PropTypes from 'prop-types';
import ArticleDetailModal from '../components/ArticleDetailModal';
import { fetchArticles, hideRow, upVote } from '../actions';
import { Link } from "react-router-dom";
import { shortenUrl, timeDiff } from "./../../utils";
import Loader from "./../components/loader";
import Chart from "./../components/Chart"

const styleObject = {
  tableLink: {
    "display": "inline-block",
    "margin": "0 2px",
    "color": "#b3b1b1"
  },
  contentStyle: {
    "fontSize": "20px"
  },
  curserPointer: {
    "cursor": "pointer"
  },
  grayColor: {
    "color": "#b3b1b1"
  }
};
const ArticleListPage = props => {
  const [chartData, setChartData] = useState([]);
  const { articles, match } = props;
  const category = props && articles[0] && articles[0].source.name;

  const { fetchArticles: loadArticles } = props;
  const hideRow = function (id) {
    props.hideRow(id)
  }
  const upVote = function (id, points) {
    props.upVote(id);
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    if (match.params.id) {
      loadArticles(match.params.id);
    } else {
      loadArticles();
    }
  }, [loadArticles, match.params.id]);

  useEffect(() => {
    if (props.articles.hits.length > 0) {

      let chartObject = {};
      props.articles.hits.map(item => {
        if (item !== null) {
          let itemId = item.objectID;
          if (!chartObject[itemId])
            chartObject[itemId] = { id: itemId, count: 0 };
          chartObject[itemId]["count"] = props.upVoteObject[itemId] || 0;
        }

      });
      setChartData(Object.values(chartObject));
    }
  }, [props.articles.hits, props.upVoteObject])

  const renderArticles = () => {
    return props.articles.hits.map(hit => {
      let upvote = props.upVoteObject && props.upVoteObject[hit.objectID] ? props.upVoteObject[hit.objectID] : 0;

      let upVoteColor = (upvote < 100 && upvote > 50) ? "maroon" : upvote > 99 ? "orange" : "black"
      return (<tr key={hit.objectID} className={`${props.hiddenList.indexOf(hit.objectID) !== -1 ? "hide" : ""}`}>
        <td className="center-align">{hit.num_comments || 0}</td>
        <td className="center-align" style={{ "color": upVoteColor }}>{upvote}</td>
        <td><span style={styleObject.curserPointer} onClick={() => upVote(hit.objectID)}><i className="material-icons">arrow_drop_up</i></span></td>
        <td><span style={styleObject.contentStyle}>{hit.title || hit.story_title || ""}</span>
          {hit.story_url && (<a style={styleObject.tableLink} className="tableLink" target="_blank" href={hit.story_url}>{shortenUrl(hit.story_url)}</a>)}
        by {hit.author} <span style={styleObject.grayColor}>{timeDiff(hit.created_at)}</span> <span style={styleObject.curserPointer} onClick={() => hideRow(hit.objectID)}>[Hide]</span></td>
      </tr>)


    }
    );
  };

  const TableStructure = () => {
    return <div>
      <table className="striped responsive-table">
        <thead>
          <tr>
            <th>Comments</th>
            <th style={{ "width": "100px" }}>Vote Count</th>
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
      <Chart chartData={chartData}></Chart>
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
  return {
    articles: state.articles,
    hiddenList: state.articles.hiddenItems,
    upVoteObject: state.articles.upVote
  };
};

export default connect(
  mapStateToProps,
  { fetchArticles, hideRow, upVote }
)(ArticleListPage);
