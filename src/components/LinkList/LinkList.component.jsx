import React from "react";
// stylesheet
import "./LinkList.styles.scss";

export const LinkList = props => {
  return (
    <div className="mission-links">
      {[
        ["reddit_campaign", "Reddit Campaign"],
        ["reddit_launch", "Reddit Launch"],
        ["reddit_recovery", "Reddit Recovery"],
        ["reddit_media", "Reddit Media"],
        ["presskit", "Press Kit"],
        ["article_link", "Article"],
        ["video_link", "Watch Video"]
      ].map(link => {
        if (props.mission.links[link[0]]) {
          return (
            <a
              className="mission-link"
              href={props.mission.links[link[0]]}
              key={`${props.mission.flight_number}_${link[1]}`}
            >
              {link[1]}
            </a>
          );
        }
        return "";
      })}
    </div>
  );
};
