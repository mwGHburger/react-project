import React, { useState, useEffect } from "react";
//stylesheet
import "./MissionItem.styles.scss";
// import defaultImage from "../../assets/image_fallback.png";
// Component
import { LinkList } from "../LinkList/LinkList.component";

export const MissionItem = props => {
  // declare state
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [payload, setPayload] = useState("");
  const [launchPadName, setLaunchPadName] = useState("");
  const [missionSuccess, setMissionSuccess] = useState("");

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
    setDate(`${date}${dateSuffix} ${monthNames[month]} ${year}`);
  };

  useEffect(() => {
    handleDate();
    handlePayloadID();
    findLaunchPadName();
    handleTime();
    handleMissionSuccess();
  });

  const handlePayloadID = () => {
    const payloadList = props.mission.payloads;
    const payload = payloadList[payloadList.length - 1];
    setPayload(payload.payload_id);
  };

  const findLaunchPadName = () => {
    // Array,prototype.find
    const launchPad = props.launchPads.find(launchPad => {
      return launchPad.id === props.mission.launch_site.site_id;
    });

    if (!launchPad) {
      return;
    }
    setLaunchPadName(launchPad.full_name);
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
    setTime(`${timeArray[0]}:${timeArray[1]}${timeSuffix}`);
  };

  const handleMissionSuccess = () => {
    if (props.mission.launch_success && props.mission.land_success) {
      return setMissionSuccess("");
    }
    return setMissionSuccess(" Failed Mission");
  };

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
