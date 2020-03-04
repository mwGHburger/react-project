import React, { Component } from "react";
import "./App.scss";
// Components
import { Header } from "./components/header/header.component";
import { SearchFilter } from "./components/search-filter/search-filter.component";
import { MissionList } from "./components/mission-list/mission-list.component";
import { Footer } from "./components/footer/footer.component";

class App extends Component {
  constructor() {
    super();
    this.state = {
      missions: [
        {
          flight_number: 49,
          launch_date_local: "2017-10-11T18:53:00-04:00",
          rocket: {
            rocket_id: "falcon9",
            rocket_name: "Falcon 9",
            rocket_type: "FT"
          },
          telemetry: {
            flight_club: "https://www.flightclub.io/results/?code=SS11"
          },
          core_serial: "B1031",
          cap_serial: null,
          launch_site: {
            site_id: "ksc_lc_39a",
            site_name: "KSC LC 39A"
          },
          payloads: [
            {
              payload_id: "SES-11",
              customers: ["SES"],
              payload_type: "Satellite",
              payload_mass_kg: 2700,
              payload_mass_lbs: 5952,
              orbit: "GTO"
            },
            {
              payload_id: "EchoStar 105",
              customers: ["EchoStar"],
              payload_type: "Satellite",
              payload_mass_kg: 2700,
              payload_mass_lbs: 5952,
              orbit: "GTO"
            }
          ],
          launch_success: false,
          reused: true,
          land_success: true,
          landing_type: "ASDS",
          landing_vehicle: "OCISLY",
          links: {
            mission_patch: "https://i.imgur.com/03gonKW.png",
            reddit_campaign:
              "https://www.reddit.com/r/spacex/comments/6yvn64/ses11echostar_105_launch_campaign_thread/",
            reddit_launch:
              "https://www.reddit.com/r/spacex/comments/75bw7p/ses11echostar105_official_launch_discussions/",
            reddit_recovery: null,
            reddit_media:
              "https://www.reddit.com/r/spacex/comments/75pgu5/rspacex_ses11_media_thread_videos_images_gifs/",
            presskit:
              "http://www.spacex.com/sites/spacex/files/echostar105ses11presskit.pdf",
            article_link: null,
            video_link: "https://www.youtube.com/watch?v=iv1zeGSvhIw"
          },
          details:
            "Nineteenth comsat to GTO, also the fourth satellite launched for SES and second for Echostar. Third time a first stage booster will be reused."
        }
      ],
      launchPads: [],
      keywordField: "",
      launchPadField: "",
      minYearField: "",
      maxYearField: "",
      filteredMissions: [],
      appliedSearch: false
    };
  }

  componentDidMount() {
    // API call
    fetch("http://localhost:8001/launches")
      .then(res => res.json())
      .then(data =>
        this.setState({
          missions: data
        })
      );

    fetch("http://localhost:8001/launchpads")
      .then(res => res.json())
      .then(data =>
        this.setState({
          launchPads: data
        })
      );
  }

  handleApplyBtn = e => {
    this.setState({ appliedSearch: true });
    // destructure
    const {
      missions,
      launchPads,
      keywordField,
      launchPadField,
      minYearField,
      maxYearField
    } = this.state;

    let filteredMissions = missions.filter(mission => {
      // keyword
      return mission.rocket.rocket_name
        .toLowerCase()
        .includes(keywordField.toLowerCase());
    });
    // launchpad

    // find id
    if (launchPadField.length > 0) {
      const matchedLaunchPad = launchPads.find(launchPad => {
        return launchPad.full_name === launchPadField;
      });

      filteredMissions = filteredMissions.filter(mission => {
        return mission.launch_site.site_id === matchedLaunchPad.id;
      });
    }

    // find min year
    if (minYearField.length > 0) {
      // console.log(minYearField);
      filteredMissions = filteredMissions.filter(mission => {
        const launch_year = parseInt(mission.launch_date_local.substring(0, 4));
        return launch_year >= parseInt(minYearField);
      });
    }

    // find max year
    if (maxYearField.length > 0) {
      // console.log(minYearField);
      filteredMissions = filteredMissions.filter(mission => {
        const launch_year = parseInt(mission.launch_date_local.substring(0, 4));
        return launch_year <= parseInt(maxYearField);
      });
    }

    console.log(filteredMissions);
    this.setState({ filteredMissions: filteredMissions });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <a name="top"></a>
        <div className="main-content">
          <SearchFilter
            launchPads={this.state.launchPads}
            handleKeywordChange={e =>
              this.setState({ keywordField: e.target.value })
            }
            handleLaunchPadChange={e => {
              e.target.value === "Any"
                ? this.setState({ launchPadField: "" })
                : this.setState({ launchPadField: e.target.value });
            }}
            handleMinYearChange={e =>
              e.target.value === "Any"
                ? this.setState({ minYearField: "" })
                : this.setState({ minYearField: e.target.value })
            }
            handleMaxYearChange={e =>
              e.target.value === "Any"
                ? this.setState({ maxYearField: "" })
                : this.setState({ maxYearField: e.target.value })
            }
            handleApplyBtn={this.handleApplyBtn}
          />
          <MissionList
            missions={
              this.state.appliedSearch === false
                ? this.state.missions
                : this.state.filteredMissions
            }
            launchPads={this.state.launchPads}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
