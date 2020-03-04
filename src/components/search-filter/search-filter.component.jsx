import React from "react";
// stylesheet
import "./search-filter.styles.scss";

export const SearchFilter = props => {
  return (
    <div className="search-container">
      <div className="keywords">
        <h2>Keywords</h2>
        <input
          className="search"
          type="search"
          placeholder="eg Falcon"
          onChange={props.handleKeywordChange}
        />
      </div>
      <div className="launch-pad custom-select">
        <h2>Launch Pad</h2>
        <select onChange={props.handleLaunchPadChange}>
          <option>Any</option>
          {props.launchPads.map(launchPad => {
            return <option key={launchPad.id}>{launchPad.full_name}</option>;
          })}
        </select>
      </div>
      <div className="min-year custom-select">
        <h2>Min Year</h2>
        <select onChange={props.handleMinYearChange}>
          <option>Any</option>
          <option>2005</option>
          <option>2006</option>
          <option>2007</option>
          <option>2008</option>
          <option>2009</option>
          <option>2010</option>
          <option>2011</option>
          <option>2012</option>
          <option>2013</option>
          <option>2014</option>
          <option>2015</option>
          <option>2016</option>
          <option>2017</option>
          <option>2018</option>
        </select>
      </div>
      <div className="max-year custom-select">
        <h2>Max Year</h2>
        <select onChange={props.handleMaxYearChange}>
          <option>Any</option>
          <option>2005</option>
          <option>2006</option>
          <option>2007</option>
          <option>2008</option>
          <option>2009</option>
          <option>2010</option>
          <option>2011</option>
          <option>2012</option>
          <option>2013</option>
          <option>2014</option>
          <option>2015</option>
          <option>2016</option>
          <option>2017</option>
          <option>2018</option>
        </select>
      </div>
      <button className="btn-apply" onClick={props.handleApplyBtn}>
        Apply
      </button>
    </div>
  );
};
