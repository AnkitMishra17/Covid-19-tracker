import React, { Component } from "react";
import { Link } from "react-router-dom";
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
const { NovelCovid } = require('novelcovid');
const track = new NovelCovid();

const Styleddiv = styled.div`
  margin: 40px 200px;
  box-shadow: -10px -10px 30px 2px rgba(0, 0, 0, 0.1);
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
    let country_stats = await track.countries(null, 'cases');
    this.setState({
      data: [...this.state.data, ...country_stats]
    });
  }

  render() {
    return (
      <div>
          <h1 className="header">
            <span role="img" aria-label="emoji">
              🌎
            </span>{" "}
            Country Breakdown
          </h1>
        <Styleddiv>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead style={{ backgroundColor: "#E5E5E5" }}>
                <TableRow>
                  <TableCell align="center" className="heading">
                    Country
                  </TableCell>
                  <TableCell className="heading">Cases</TableCell>
                  <TableCell className="heading">New Cases</TableCell>
                  <TableCell className="heading">Deaths</TableCell>
                  <TableCell className="heading">New Deaths</TableCell>
                  <TableCell className="heading">Recovered</TableCell>
                  <TableCell className="heading">Active Cases</TableCell>
                  <TableCell className="heading">Critical</TableCell>
                  <TableCell className="heading">Cases/1M</TableCell>
                  <TableCell className="heading">Deaths/1M</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.data.map(row =>
                  row.country !== "World" ? (
                    <TableRow key={row.country}>
                      <TableCell>
                        <Countrydiv>
                          <Avatar
                            variant="circle"
                            src={row.countryInfo.flag}
                          ></Avatar>
                          <p
                            style={{
                              marginLeft: "25px",
                              marginBottom: "-3px",
                              fontWeight: "bold"
                            }}
                            className="para"
                          >
                          <Link
                            to={`/country/${row.country}`}
                            className="para link"
                          >
                            {" "}
                            {row.country}{" "}
                          </Link></p>
                        </Countrydiv>
                      </TableCell>
                      <TableCell>
                        <p className="para">{row.cases.toLocaleString()}</p>
                      </TableCell>
                      <TableCell>
                        <p className="para">+{row.todayCases.toLocaleString()}</p>
                      </TableCell>
                      <TableCell>
                        <p className="para">{row.deaths.toLocaleString()}</p>
                      </TableCell>
                      <TableCell style={{ color: "#E85A4F" }}>
                        <p className="para">+{row.todayDeaths.toLocaleString()}</p>
                      </TableCell>
                      <TableCell style={{ color: "#2ed573" }}>
                        <p className="para">{row.recovered.toLocaleString()}</p>
                      </TableCell>
                      <TableCell>
                        <p className="para">{row.active.toLocaleString()}</p>
                      </TableCell>
                      <TableCell>
                        <p className="para" style={{color: "#F79E02"}}>{row.critical.toLocaleString()}</p>
                      </TableCell>
                      <TableCell>
                        <p className="para">{row.casesPerOneMillion.toLocaleString()}</p>
                      </TableCell>
                      <TableCell>
                        <p className="para">{row.deathsPerOneMillion.toLocaleString()}</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <h1> </h1>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Styleddiv>
      </div>
    );
  }
}

export default Globalstats;
