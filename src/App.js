import React, { Component } from "react";
import "./App.scss";
// Components
import { Header } from "./components/Header/Header.component";
import { SearchFilter } from "./components/SearchFilter/SearchFilter.component";
import { ScreenLoader } from "./components/ScreenLoader/ScreenLoader.component";
import { MissionList } from "./components/MissionList/MissionList.component";
import { Footer } from "./components/Footer/Footer.component";

class App extends Component {
  constructor() {
    super();
    this.state = {
      missions: [],
      launchPads: [],
      keywordField: "",
      launchPadField: "",
      minYearField: "",
      maxYearField: "",
      filteredMissions: [],
      appliedSearch: false,
      searchResults: 0,
      invalidYearRange: false,
      loading: true
    };
  }

  componentDidMount() {
    // API call
    fetch("http://localhost:8001/launches")
      .then(res => res.json())
      .then(data => {
        this.setState({
          missions: data,
          searchResults: data.length
        });
      });

    fetch("http://localhost:8001/launchpads")
      .then(res => res.json())
      .then(data => {
        this.setState({
          launchPads: data,
          loading: false
        });
      });
  }

  handleApplyBtn = e => {
    this.setState({ appliedSearch: true, loading: true });
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
      return (
        mission.rocket.rocket_name
          .toLowerCase()
          .includes(keywordField.toLowerCase()) ||
        mission.payloads[mission.payloads.length - 1].payload_id
          .toLowerCase()
          .includes(keywordField.toLowerCase()) ||
        mission.flight_number
          .toString()
          .toLowerCase()
          .includes(keywordField.toLowerCase())
      );
    });

    // launchpad
    // find launchpad id
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
      filteredMissions = filteredMissions.filter(mission => {
        const launch_year = parseInt(mission.launch_date_local.substring(0, 4));
        return launch_year >= parseInt(minYearField);
      });
    }

    // find max year
    if (maxYearField.length > 0) {
      filteredMissions = filteredMissions.filter(mission => {
        const launch_year = parseInt(mission.launch_date_local.substring(0, 4));
        return launch_year <= parseInt(maxYearField);
      });
    }
    // invalid year range check
    if (parseInt(maxYearField) < parseInt(minYearField)) {
      this.setState({ invalidYearRange: true });
    } else {
      this.setState({ invalidYearRange: false });
    }

    setTimeout(() => {
      this.setState({
        filteredMissions: filteredMissions,
        searchResults: filteredMissions.length,
        loading: false
      });
    }, 1000);
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
          {this.state.loading ? <ScreenLoader /> : ""}

          <MissionList
            missions={
              this.state.appliedSearch === false
                ? this.state.missions
                : this.state.filteredMissions
            }
            searchResults={this.state.searchResults}
            launchPads={this.state.launchPads}
          >
            {this.state.invalidYearRange
              ? "Invalid year range, please check again"
              : ""}
          </MissionList>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
