import React from "react";
//stylesheet
import "./mission-list.styles.scss";
// component
import { MissionItem } from "../mission-item/mission-item.component";

export const MissionList = props => {
  return (
    <div className="mission-list">
      <div className="results-header">
        <h2>
          {props.searchResults === 1
            ? `Showing ${props.searchResults} Mission`
            : `Showing ${props.searchResults} Missions`}
        </h2>
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
