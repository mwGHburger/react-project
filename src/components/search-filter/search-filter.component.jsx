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
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>
      <div className="min-year custom-select">
        <h2>Min Year</h2>
        <select onChange={props.handleMinYearChange}>
          <option>Any</option>
          <option>201</option>
          <option>202</option>
          <option>203</option>
        </select>
      </div>
      <div className="max-year custom-select">
        <h2>Min Year</h2>
        <select onChange={props.handleMaxYearChange}>
          <option>Any</option>
          <option>1012</option>
          <option>2012</option>
          <option>3012</option>
        </select>
      </div>
      <button className="btn-apply" onClick={props.handleApplyBtn}>
        Apply
      </button>
    </div>
  );
};
