import React, { Component } from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import styled from 'styled-components';
// import Button from '@material-ui/core/Button';
let covid = require('novelcovid');


// const StyledButton = styled(Button)`
//   background-color: #6772e5;
//   color: #fff;
//   box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
//   padding: 7px 14px;
//   &:hover {
//     background-color: #5469d4;
//   }
// `;

const StyledPaper = styled(Paper)`
    text-align: center;
    padding: 13px;
`;

const Styleddiv = styled.div`
    margin: 25px 50px;
    position: relative;
    top: -60px;
`;
class Stats extends Component {
  
    state = {
      cases : "",
      deaths : "",
      recovered : "",
      active : ""
    }

    fetchData = async () => {
      let data = await covid.getAll();
      Object.entries(data).map(([key, value]) => {
        if(key !== 'updated'){
          this.setState({
            [key]: value
          })}
      });
    };

    async componentDidMount(){
      this.fetchData();
    }
    
    render() {
            return (
              <Styleddiv>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6} md={3}>
                  <StyledPaper>
                    <h2>{this.state.cases}</h2>
                    <p>Confirmed Cases</p>
                  </StyledPaper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StyledPaper>
                    <h2>{this.state.deaths}</h2>
                    <p>Deceased</p>
                  </StyledPaper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StyledPaper>
                    <h2>{this.state.recovered}</h2>
                    <p>Recovered</p>
                  </StyledPaper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StyledPaper>
                    <h2>{this.state.active}</h2>
                    <p>Active Cases</p>
                  </StyledPaper>
                </Grid>
              </Grid>
            </Styleddiv>
        )
    }
}

export default Stats;