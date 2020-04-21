import React, { Component } from "react";
import { Line, Bar } from "react-chartjs-2";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
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
    selected_value: "Choose option",
    chart_type: false,
  };
  componentDidUpdate(props,prevstate) {
    if(this.state.selected_value !== prevstate.selected_value){
      let country = this.props.country;
      this.getchartdata(country);
    }
  }
  async getchartdata(country) {
    let countrydata = await track.historical(null, country);
    this.setchartdata(countrydata);
  }
  async setchartdata(countrydata) {
    let cases_data = [];
    let dates = [];
    let data_timeline, label, background, border;
    let { selected_value } = this.state;
    if (selected_value === "cases") {
      data_timeline = countrydata.timeline.cases;
      label = "Confirmed Cases Since 22nd of March";
      background = "rgba(247, 158, 2, 0.7)";
      border = "rgba(247, 158, 2, 1)";
    } else if (selected_value === "recovered") {
      data_timeline = countrydata.timeline.recovered;
      label = "Recovered Patients Since 22nd of March";
      background = "rgba(46, 213, 115, 0.7)";
      border = "rgba(46, 213, 115, 1)";
    } else if (selected_value === "deaths") {
      data_timeline = countrydata.timeline.deaths;
      label = "Deceased Patients Since 22nd of March";
      background = "rgba(232, 90, 79, 0.7)";
      border = "rgba(232, 90, 79, 1)";
    } else {
      data_timeline = countrydata.timeline.cases;
      label = "Daily Cases Since 22nd of March";
      background = "rgba(40, 81, 138, 0.7)";
      border = "rgba(40, 81, 138, 1)";
    }
    for (let key in data_timeline) {
      dates.push(key);
      cases_data.push(data_timeline[key]);
    }
    if (selected_value === "daily") {
      cases_data = cases_data.map(function (elem, index) {
        return cases_data[index + 1] - cases_data[index];
      });
    }
    this.setState({
      chartdata: {
        labels: dates,
        datasets: [
          {
            label: label,
            data: cases_data,
            backgroundColor: background,
            borderColor: border,
            borderWidth: 3,
          },
        ],
      },
    });
  }
  updateselect = (e) => {
    this.setState({
      selected_value: e.target.value,
    });
  };
  render() {
    const handleChange = () => {
      this.setState({
        chart_type: !this.state.chart_type,
      });
    };
    return (
      <div>
        <Grid container spacing={3} justify="center" alignItems="center">
          <Grid item md={12} xs={12}>
            <Relativediv style={{ height: "400px" }}>
              <Grid container spacing={3} justify="flex-start" alignItems="center">
                <Grid item md={4} xs={2}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.chart_type}
                        onChange={handleChange}
                      />
                    }
                    label={this.state.chart_type ? "Line" : "Bar"}
                  />
                </Grid>
                <Grid item md={7} xs={5}>
                  <FormControl style={{ padding: "20px", marginLeft: "10px" }}>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={this.state.selected_value}
                      style={{ width: "180px" }}
                      onChange={this.updateselect}
                    >
                      <MenuItem value={"Choose option"} disabled>Choose option</MenuItem>
                      <MenuItem value={"cases"}>Cases</MenuItem>
                      <MenuItem value={"deaths"}>Deaths</MenuItem>
                      <MenuItem value={"recovered"}>Recovered</MenuItem>
                      <MenuItem value={"daily"}>Daily cases</MenuItem>
                    </Select>
                    <FormHelperText>Select the graph.</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              {this.state.chart_type ? (
                <Bar
                  data={this.state.chartdata}
                  options={{ maintainAspectRatio: false }}
                />
              ) : (
                <Line
                  data={this.state.chartdata}
                  options={{ maintainAspectRatio: false }}
                />
              )}
            </Relativediv>
          </Grid>
        </Grid>
      </div>
    );
  }
}
