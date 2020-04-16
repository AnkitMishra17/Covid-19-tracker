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
import newdeaths from "./newdeaths.svg";
import cpom from "./cpom.svg";
import dpom from "./dpom.svg";
import newcases from "./newcases.svg";
import criticalcases from "./criticalcases.svg";
import "./individual.css";
let covid = require("novelcovid");

const Relativediv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 50px;
  @media (max-width: 768px){
    padding: 20px;
  }
`;
const Styleddiv = styled.div`
  border-top: 5px solid #263560;
  border-radius: 5px;
  box-shadow: -10px -10px 20px 4px rgba(0, 0, 0, 0.1);
  z-index: -10;
  
`;
const CustomGrid = styled(Grid)`
  border-radius: 5px;
  border-top: 5px solid #263560;
  padding: 20px;
  margin-top: 50px;
  margin-bottom: 50px;
  width: 80%;
  box-shadow: -10px -5px 20px 4px rgba(0, 0, 0, 0.1);
  z-index: -10;
  @media (max-device-width : 768px) and (orientation: portrait) {
    width:100%;
    padding: 0px;
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
    window.scrollTo(0, 0);
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
        <Relativediv>
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
                <Avatar variant="rounded" src={newcases}></Avatar>
                <h5 className="info1">NEW CASES</h5>
              </div>
              <h1 className="info3">+{todayCases}</h1>
            </StyledPaper>
          </Grid>
          <Grid item md={4} xs={6}>
            <StyledPaper className="secondaryinfo">
              <div className="info2">
                <Avatar variant="rounded" src={newdeaths}></Avatar>
                <h5 className="info1">NEW DEATHS</h5>
              </div>
              <h1 className="info3">{todayDeaths}</h1>
            </StyledPaper>
          </Grid>
          <Grid item md={4} xs={6}>
            <StyledPaper className="secondaryinfo">
              <div className="info2">
                <Avatar variant="rounded" src={criticalcases}></Avatar>
                <h5 className="info1">CRITICIAL</h5>
              </div>
              <h1 className="info3">{critical}</h1>
            </StyledPaper>
          </Grid>
          <Grid item md={4} xs={6}>
            <StyledPaper className="secondaryinfo">
              <div className="info2">
                <Avatar variant="rounded" src={cpom}></Avatar>
                <h5 className="info1">CASES/1 MIL</h5>
              </div>
              <h1 className="info3">{casesPerOneMillion}</h1>
            </StyledPaper>
          </Grid>
          <Grid item md={4} xs={6}>
            <StyledPaper className="secondaryinfo">
              <div className="info2">
                <Avatar variant="rounded" src={dpom}></Avatar>
                <h5 className="info1">DEATHS/1 MIL</h5>
              </div>
              <h1 className="info3">{deathsPerOneMillion}</h1>
            </StyledPaper>
          </Grid>
        </CustomGrid>
        </Relativediv>
      </React.Fragment>
    );
  }
}

export default Countrystats;
