import React from "react";
//stylesheet
import "./MissionList.styles.scss";
// component
import { MissionItem } from "../MissionItem/MissionItem.component";

export const MissionList = props => {
  return (
    <div className="mission-list">
      <div className="results-header">
        <h2>
          {props.searchResults === 1
            ? `Showing ${props.searchResults} Mission`
            : `Showing ${props.searchResults} Missions`}
        </h2>
        <p style={{ color: "#ec607a", fontSize: "1rem", fontWeight: "500" }}>
          {props.children}
        </p>
      </div>
      {props.missions.map(mission => {
        return (
          <MissionItem
            key={mission.flight_number}
            mission={mission}
            launchPads={props.launchPads}
          />
        );
      })}
    </div>
  );
};
