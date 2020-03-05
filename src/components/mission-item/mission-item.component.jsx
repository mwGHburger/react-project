import React from "react";
//stylesheet
import "./mission-item.styles.scss";
// import defaultImage from "../../assets/image_fallback.png";
// Component
import { LinkList } from "../link-list/link-list.component";

export const MissionItem = props => {
  const handleDate = () => {
    // handle date
    const dateString = props.mission.launch_date_local.split("T")[0];
    const dateObj = new Date(dateString);
    const date = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();

    let dateSuffix = "th";
    if (date === 1 || date === 21 || date === 31) {
      dateSuffix = "st";
    } else if (date === 2 || date === 22) {
      dateSuffix = "nd";
    } else if (date === 3 || date === 23) {
      dateSuffix = "rd";
    }

    // get Month name
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    return `${date}${dateSuffix} ${monthNames[month]} ${year}`;
  };

  const handlePayloadID = () => {
    const payloadList = props.mission.payloads;
    const payload = payloadList[payloadList.length - 1];
    return payload.payload_id;
  };

  handlePayloadID();
  const findLaunchPadName = () => {
    // Array,prototype.find
    const launchPad = props.launchPads.find(launchPad => {
      return launchPad.id === props.mission.launch_site.site_id;
    });

    if (!launchPad) {
      return;
    }
    return launchPad.full_name;
  };

  const handleTime = () => {
    const timeString = props.mission.launch_date_local
      .split("T")[1]
      .split("-")[0];

    const timeArray = timeString.split(":");
    timeArray[0] = parseInt(timeArray[0], 10);

    let timeSuffix = "am";

    if (timeArray[0] === 12) {
      timeSuffix = "pm";
    } else if (timeArray[0] > 12 && timeArray[0] < 24) {
      timeArray[0] = timeArray[0] - 12;
      timeSuffix = "pm";
    } else if (timeArray[0] === 24) {
      timeArray[0] = 0;
    }

    return `${timeArray[0]}:${timeArray[1]}${timeSuffix}`;
  };

  const handleMissionSuccess = () => {
    if (props.mission.launch_success && props.mission.land_success) {
      return "";
    }
    return " Failed Mission";
  };

  return (
    <div className="mission-item">
      <img src={props.mission.links.mission_patch} alt="" />
      <div className="mission-main-content">
        <h2>
          {`${props.mission.rocket.rocket_name} - ${handlePayloadID()} `}
          {/* inline styling */}
          {handleMissionSuccess() ? (
            <span>
              -
              <span style={{ color: "#ec607a", fontWeight: "500" }}>
                {handleMissionSuccess()}
              </span>
            </span>
          ) : (
            ""
          )}
        </h2>
        <p>
          Launched <span className="text-hl">{handleDate()}</span> at{" "}
          <span className="text-hl">{handleTime()}</span> from{" "}
          <span className="text-hl">{findLaunchPadName()}</span>
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
