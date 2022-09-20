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
import { historicalCountry } from "../../../static/app.api";

const Relativediv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  border-top: 5px solid #263560;
  background-color: rgba(244, 244, 244, 0.5);
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
    data: {},
    selected_value: "Choose option",
    chart_type: false,
    fetchCount: 0
  };
  componentDidUpdate(props, prevstate) {
    if (this.state.selected_value !== prevstate.selected_value && !prevstate.fetchCount) {
      let country = this.props.country;
      this.getchartdata(country);
    }
  }
  async getchartdata(country) {
    let countrydata = await fetch(`${historicalCountry}/${country}?lastdays=30`);
    countrydata.json().then((data)=>{
      this.setState({data})
      this.setState((prevState)=>({
        fetchCount: prevState.fetchCount+1
      }))
      this.setchartdata(this.state.data);
    })
  }
  async setchartdata(countrydata) {
    let cases_data = [],
      deaths_data = [],
      recovered_data = [],
      dates = [];
    let data_timeline,
      data_timeline1,
      data_timeline2,
      label,
      background,
      border;
    let { selected_value } = this.state;
    if (selected_value === "cases") {
      data_timeline = countrydata.timeline.cases;
      label = "Confirmed Case";
      background = "rgba(247, 158, 2, 0.7)";
      border = "rgba(247, 158, 2, 1)";
    } else if (selected_value === "recovered") {
      data_timeline = countrydata.timeline.recovered;
      label = "Recovered Patients";
      background = "rgba(46, 213, 115, 0.7)";
      border = "rgba(46, 213, 115, 1)";
    } else if (selected_value === "deaths") {
      data_timeline = countrydata.timeline.deaths;
      label = "Deceased Patients";
      background = "rgba(232, 90, 79, 0.7)";
      border = "rgba(232, 90, 79, 1)";
    } else if (selected_value === "dailydeaths") {
      data_timeline = countrydata.timeline.deaths;
      label = "Daily Deaths";
      background = "rgba(215, 35, 35, 0.7)";
      border = "rgba(215, 35, 35, 1)";
    } else if (selected_value === "dailyrecovered") {
      data_timeline = countrydata.timeline.recovered;
      label = "New Recoveries";
      background = "rgba(80, 216, 144, 0.7)";
      border = "rgba(80, 216, 144, 1)";
    } else if (selected_value === "active") {
      data_timeline = countrydata.timeline.cases;
      data_timeline1 = countrydata.timeline.deaths;
      data_timeline2 = countrydata.timeline.recovered;
      label = "Active Cases";
      background = "rgba(225, 100, 40, 0.7)";
      border = "rgba(225, 100, 40, 1)";
    } else {
      data_timeline = countrydata.timeline.cases;
      label = "Daily Cases";
      background = "rgba(40, 81, 138, 0.7)";
      border = "rgba(40, 81, 138, 1)";
    }
    if (selected_value === "active") {
      for (let key in data_timeline) {
        dates.push(key);
        cases_data.push(data_timeline[key]);
        deaths_data.push(data_timeline1[key]);
        recovered_data.push(data_timeline2[key]);
      }
      cases_data = cases_data.map(function (elem, index) {
        return cases_data[index] - (deaths_data[index] + recovered_data[index]);
      });
    } else {
      for (let key in data_timeline) {
        dates.push(key);
        cases_data.push(data_timeline[key]);
      }
    }
    if (selected_value === "daily") {
      cases_data = cases_data.map(function (elem, index) {
        return cases_data[index + 1] - cases_data[index];
      });
    }
    if (selected_value === "dailydeaths") {
      cases_data = cases_data.map(function (elem, index) {
        return cases_data[index + 1] - cases_data[index];
      });
    }
    if (selected_value === "dailyrecovered") {
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
    setTimeout(()=>{
      if(this.state.fetchCount){
        this.setchartdata(this.state.data)
      }
    },0)
    
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
              <Grid
                container
                spacing={3}
                justify="flex-start"
                alignItems="center"
              >
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
                      <MenuItem value={"Choose option"} disabled>
                        Choose option
                      </MenuItem>
                      <MenuItem value={"cases"}>Cases</MenuItem>
                      <MenuItem value={"deaths"}>Deaths</MenuItem>
                      <MenuItem value={"recovered"}>Recovered</MenuItem>
                      <MenuItem value={"active"}>Active</MenuItem>
                      <MenuItem value={"daily"}>Daily Cases</MenuItem>
                      <MenuItem value={"dailydeaths"}>Daily Deaths</MenuItem>
                      <MenuItem value={"dailyrecovered"}>Daily Recoveries</MenuItem>
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
