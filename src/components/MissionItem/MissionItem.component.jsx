import React from "react";
//stylesheet
import "./MissionItem.styles.scss";

// Component
import { LinkList } from "../LinkList/LinkList.component";
//Helpers
import { handleDate } from "../../helpers/handleDate.js";
import { handlePayloadID } from "../../helpers/handlePayloadID.js";
import { findLaunchPadName } from "../../helpers/findLaunchPadName.js";
import { handleTime } from "../../helpers/handleTime.js";
import { handleMissionSuccess } from "../../helpers/handleMissionSuccess.js";

export const MissionItem = props => {
  const date = handleDate(props.mission.launch_date_local);
  const payload = handlePayloadID(props.mission.payloads);
  const launchPadName = findLaunchPadName(
    props.launchPads,
    props.mission.launch_site.site_id
  );
  const time = handleTime(props.mission.launch_date_local);
  const missionSuccess = handleMissionSuccess(
    props.mission.launch_success,
    props.mission.land_success
  );

  return (
    <div className="mission-item">
      <img src={props.mission.links.mission_patch} alt="" />
      <div className="mission-main-content">
        <h2>
          {`${props.mission.rocket.rocket_name} - ${payload} `}
          {/* inline styling */}
          {missionSuccess ? (
            <span>
              -
              <span style={{ color: "#ec607a", fontWeight: "500" }}>
                {missionSuccess}
              </span>
            </span>
          ) : (
            ""
          )}
        </h2>
        <p>
          Launched <span className="text-hl">{date}</span> at{" "}
          <span className="text-hl">{time}</span> from{" "}
          <span className="text-hl">{launchPadName}</span>
        </p>
        <LinkList mission={props.mission} />
      </div>
      <div className="flight-number-container">
        <h1>{`#${props.mission.flight_number}`}</h1>
        <p>Flight Number</p>
      </div>
    </div>
  );
};
