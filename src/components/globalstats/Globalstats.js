import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import styled from "styled-components";
import "./global.css";
let covid = require("novelcovid");

const Styleddiv = styled.div`
  margin: 120px 200px;
  box-shadow: -10px -10px 20px 4px rgba(0, 0, 0, 0.1);
  @media (max-width: 900px) {
    margin: 10px 20px;
  }
`;

const Countrydiv = styled.div`
  display: flex;
  flex-direction: row;
  font-family: "Hind", sans-serif;
`;

class Globalstats extends Component {
  state = {
    data: []
  };

  async componentDidMount() {
    let country_stats = await covid.getCountry();
    this.setState({
      data: [...this.state.data, ...country_stats]
    });
  }

  render() {
    return (
      <Styleddiv>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Country</TableCell>
                <TableCell>Cases</TableCell>
                <TableCell>New Cases</TableCell>
                <TableCell>Deaths</TableCell>
                <TableCell>New Deaths</TableCell>
                <TableCell>Recovered</TableCell>
                <TableCell>Active Cases</TableCell>
                <TableCell>Critical</TableCell>
                <TableCell>DOPM</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map(row => (
                <TableRow key={row.country}>
                  <TableCell >
                    <Countrydiv >
                      <Avatar
                        variant="square"
                        src={row.countryInfo.flag}
                        style={{ height: "25px", borderRadius: "6px" }}
                      ></Avatar>
                      <p
                        style={{
                          marginLeft: "25px",
                          marginBottom: "-3px",
                          fontWeight: "bold"
                        }}
                        className="para"
                      >
                        {row.country}
                      </p>
                    </Countrydiv>
                  </TableCell>
                  <TableCell>
                    <p className="para">{row.cases}</p>
                  </TableCell>
                  <TableCell>
                    <p className="para">+{row.todayCases}</p>
                  </TableCell>
                  <TableCell>
                    <p className="para">{row.deaths}</p>
                  </TableCell>
                  <TableCell style={{ color: "#E85A4F" }}>
                    <p className="para">+{row.todayDeaths}</p>
                  </TableCell>
                  <TableCell style={{ color: "#2ed573" }}>
                    <p className="para">{row.recovered}</p>
                  </TableCell>
                  <TableCell>
                    <p className="para">{row.active}</p>
                  </TableCell>
                  <TableCell>
                    <p className="para">{row.critical}</p>
                  </TableCell>
                  <TableCell>
                    <p className="para">{row.deathsPerOneMillion}</p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Styleddiv>
    );
  }
}

export default Globalstats;
