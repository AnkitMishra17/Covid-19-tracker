/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import confirmed from "./confirmed.png";
import recovered from "./recovery.png";
import { fetchTotal } from "../../static/app.api";
import "./stats.css";

const StyledPaper = styled(Paper)`
  text-align: center;
  padding: 13px;
`;

const Styleddiv = styled.div`
  margin: 25px 50px;
  position: relative;
  top: -60px;
  left: -20px;
  @media (max-width: 768px) {
    left: 0px;
  }
`;
class Stats extends Component {
  state = {
    cases: "",
    deaths: "",
    recovered: "",
    active: ""
  };

  fetchData = async () => {
    
    let data = await fetch(fetchTotal);
    data.json().then((res)=>{
      Object.entries(res).forEach(([key, value]) => {
        if (key !== "updated") {
          this.setState({
            [key]: value.toLocaleString()
          });
        }
      });
    })
  };

  async componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <Styleddiv>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} md={3}>
            <StyledPaper className="clipanimate">
              <div className="paper confirmed"></div>
              <div className="head-data">
                <div>
                  <h2 style={{ color: "#4D6D9A" }}>{this.state.cases}</h2>
                  <p>Confirmed Cases</p>
                </div>
                <img src={confirmed} className="imgicon" />
              </div>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StyledPaper className="clipanimate">
              <div className="paper deceased"></div>
              <div className="head-data">
                <div>
                  <h2 style={{ color: "#E85A4F" }}>{this.state.deaths}</h2>
                  <p>Deceased</p>
                </div>
                <img
                  src="https://img.icons8.com/cotton/64/000000/bunch-flowers.png"
                  className="imgicon"
                />
              </div>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StyledPaper className="clipanimate">
              <div className="paper recovered"></div>
              <div className="head-data">
                <div>
                  <h2 style={{ color: "#2ed573" }}>{this.state.recovered}</h2>
                  <p>Recovered</p>
                </div>
                <img src={recovered} className="imgicon" />
              </div>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StyledPaper className="clipanimate">
              <div className="paper active"></div>
              <div className="head-data">
                <div>
                  <h2 style={{ color: "#F79E02" }}>{this.state.active}</h2>
                  <p>Active Cases</p>
                </div>
                <img
                  src="https://img.icons8.com/plasticine/100/000000/hospital-room.png"
                  className="imgicon"
                  style={{ height: "64px" }}
                />
              </div>
            </StyledPaper>
          </Grid>
        </Grid>
      </Styleddiv>
    );
  }
}

export default Stats;
