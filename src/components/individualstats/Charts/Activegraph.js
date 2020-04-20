import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
const { NovelCovid } = require("novelcovid");
const track = new NovelCovid();

const Relativediv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  border-top: 5px solid #263560;
  box-shadow: -10px -10px 30px 2px rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 50px;
  width: 100%;
  margin-top: 50px;
  @media (max-width: 768px) {
    padding: 20px;
    padding-top: 30px;
  }
`;

export default class Activegraph extends Component {
  state = {
    chartdata: {},
    selected_value: "cases"
  };
  async componentDidUpdate(props) {
    let country = this.props.country;
    this.getchartdata(country);
  }
  async getchartdata(country){
    let countrydata = await track.historical(null, country);
    this.setchartdata(countrydata);
  }
  async setchartdata(countrydata) {
    let cases_data = [];
    let dates = [];
    let data_timeline,label,background;
    let { selected_value } = this.state;
    if(selected_value === "cases"){
      data_timeline = countrydata.timeline.cases;
      label = "Timeline of Confirmed Cases";
      background = "rgba(247, 158, 2, 0.7)";
    }else if(selected_value === "recovered"){
      data_timeline = countrydata.timeline.recovered;
      label = "Timeline of Recovered Patients";
      background = "rgba(46, 213, 115, 0.7)";
    }else{
      data_timeline = countrydata.timeline.deaths;
      label = "Timeline of Deceased Patients";
      background = "rgba(232, 90, 79, 0.7)";
    }
    for (let key in data_timeline) {
      dates.push(key);
      cases_data.push(data_timeline[key]);
    }
    this.setState({
      chartdata: {
        labels: dates,
        datasets: [
          {
            label: label,
            data: cases_data,
            backgroundColor: [background],
          },
        ],
      },
    });
  }
  updateselect= (e)=> {
    this.setState({
      selected_value: e.target.value
    })
  }
  render() {
    return (
      <div>
        <Grid container spacing={3} justify="center" alignItems="center">
          <Grid item md={12} xs={12}>
            <Relativediv style={{ height: "400px" }}>
              <FormControl style={{padding: "20px" }}>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={this.state.selected_value}
                  style={{ width: "240px" }}
                  onChange={this.updateselect}
                >
                  <MenuItem value={"cases"}>Cases</MenuItem>
                  <MenuItem value={"deaths"}>Deaths</MenuItem>
                  <MenuItem value={"recovered"}>Recovered</MenuItem>
                </Select>
                <FormHelperText>Select the graph.</FormHelperText>
              </FormControl>
              <Line
                data={this.state.chartdata}
                options={{ maintainAspectRatio: false }}
              />
            </Relativediv>
          </Grid>
        </Grid>
      </div>
    );
  }
}
