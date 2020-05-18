
import React, { useEffect } from 'react';
import { Link } from "react-router-dom";


const HomePage = () => {

  return (
    <div>

      <div className="row">
        <div className="section">
          <h3>Home</h3>
        </div>
        <div className="divider" />
        <div className="section">
          <p>
            Visit <Link to="news/1">news</Link> page to get all news
            </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage
