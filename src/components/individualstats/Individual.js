import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import styled from "styled-components";
import casesimg from "./cases.svg";
import deathsimg from "./deaths.svg";
import recoveredimg from "./recoveries.svg";
import activeimg from "./active_cases.svg";
import "./individual.css";
let covid = require("novelcovid");

const Styleddiv = styled.div`
  position: absolute;
  border-top: 5px solid #263560;
  border-radius: 5px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: -10px -10px 20px 4px rgba(0, 0, 0, 0.1);
  z-index: -10;
  @media (max-width: 768px) {
    top: 85%;
    width: 90%;
  }
  @media (max-device-width : 768px) and (orientation: landscape) {
    top: 150%;
  }
`;
const CustomGrid = styled(Grid)`
  position: absolute;
  border-radius: 5px;
  border-top: 5px solid #263560;
  margin-bottom: 50px;
  top: 120%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: -10px -5px 20px 4px rgba(0, 0, 0, 0.1);
  z-index: -10;
  @media (min-width : 768px) and (max-width: 1200px){
    top: 145%;
  }
  @media (max-device-width : 768px) and (orientation: portrait) {
    top: 200%;
    width: 90%;
  }
  @media (max-device-width : 768px) and (orientation: landscape) {
    top: 350%;
    width: 90%;
  }
`;

const StyledPaper = styled(Paper)`
  padding: 10px;
  max-height: 120px;
`;

const Typo = styled(Typography)`
  font-family: "Hind", sans-serif;
  font-size: 36px;
  font-weight: bold;
`;

const CustomCard = styled(Card)`
  width: 750px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

class Countrystats extends Component {
  state = {
    data: [],
    flag1: "",
  };
  async componentDidMount(props) {
    let country = await covid.getCountry({
      country: this.props.match.params.id,
    });
    for (let key in country) {
      if (key !== "countryInfo") {
        if (country[key] !== null) {
          country[key] = country[key].toLocaleString();
        }
      }
    }
    this.stateupdate(country);
  }
  stateupdate = (country) => {
    this.setState({
      data: country,
      flag1: country.countryInfo.flag,
    });
  };

  render() {
    const {
      country,
      cases,
      todayCases,
      deaths,
      todayDeaths,
      recovered,
      active,
      critical,
      casesPerOneMillion,
      deathsPerOneMillion,
    } = this.state.data;
    return (
      <React.Fragment>
        <Styleddiv>
          <CustomCard>
            <CardActionArea>
              <CardContent>
                <Grid container spacing={3} >
                  <Grid item xs>
                    <Typo gutterBottom variant="h5" component="h2">
                      {country}
                      <div
                        className="country-flag"
                        style={{ backgroundImage: `url(${this.state.flag1})` }}
                      ></div>
                    </Typo>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <StyledPaper className="cases">
                      <div className="info2">
                        <Avatar variant="rounded" src={casesimg}></Avatar>
                        <h5 className="info1">CONFIRMED CASES</h5>
                      </div>
                      <h1 className="info3">{cases}</h1>
                    </StyledPaper>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <StyledPaper className="deaths">
                      <div className="info2">
                        <Avatar variant="rounded" src={deathsimg}></Avatar>
                        <h5 className="info1">TOTAL DEATHS</h5>
                      </div>
                      <h1 className="info3">{deaths}</h1>
                    </StyledPaper>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <StyledPaper className="recover">
                      <div className="info2">
                        <Avatar variant="rounded" src={recoveredimg}></Avatar>
                        <h5 className="info1">TOTAL RECOVERIES</h5>
                      </div>
                      <h1 className="info3">{recovered}</h1>
                    </StyledPaper>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <StyledPaper className="active-cases">
                      <div className="info2">
                        <Avatar variant="rounded" src={activeimg}></Avatar>
                        <h5 className="info1">ACTIVE CASES</h5>
                      </div>
                      <h1 className="info3">{active}</h1>
                    </StyledPaper>
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </CustomCard>
        </Styleddiv>
        <CustomGrid container justify="center" alignItems="center" spacing={3}>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <h1 align="center">
                <span role="img" aria-label="emoji">
                  📊
                </span>{" "}
                More Stats!
              </h1>
            </Grid>
          </Grid>
          <Grid item md={4} xs={6}>
            <StyledPaper className="secondaryinfo">
              <div className="info2">
                <Avatar variant="rounded" src={recoveredimg}></Avatar>
                <h5 className="info1">NEW CASES</h5>
              </div>
              <h1 className="info3">+{todayCases}</h1>
            </StyledPaper>
          </Grid>
          <Grid item md={4} xs={6}>
            <StyledPaper className="secondaryinfo">
              <div className="info2">
                <Avatar variant="rounded" src={activeimg}></Avatar>
                <h5 className="info1">NEW DEATHS</h5>
              </div>
              <h1 className="info3">{todayDeaths}</h1>
            </StyledPaper>
          </Grid>
          <Grid item md={4} xs={6}>
            <StyledPaper className="secondaryinfo">
              <div className="info2">
                <Avatar variant="rounded" src={activeimg}></Avatar>
                <h5 className="info1">CRITICIAL</h5>
              </div>
              <h1 className="info3">{critical}</h1>
            </StyledPaper>
          </Grid>
          <Grid item md={5} xs={6}>
            <StyledPaper className="secondaryinfo">
              <div className="info2">
                <Avatar variant="rounded" src={activeimg}></Avatar>
                <h5 className="info1">CASES/1 MIL</h5>
              </div>
              <h1 className="info3">{casesPerOneMillion}</h1>
            </StyledPaper>
          </Grid>
          <Grid item md={5} xs={6}>
            <StyledPaper className="secondaryinfo">
              <div className="info2">
                <Avatar variant="rounded" src={activeimg}></Avatar>
                <h5 className="info1">DEATHS/1 MIL</h5>
              </div>
              <h1 className="info3">{deathsPerOneMillion}</h1>
            </StyledPaper>
          </Grid>
        </CustomGrid>
      </React.Fragment>
    );
  }
}

export default Countrystats;
