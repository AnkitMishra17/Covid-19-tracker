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
const { NovelCovid } = require("novelcovid");
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
const CustomTableCell = styled(TableCell)`
  border: 2px solid #ececec;
  padding: 2px 5px 2px 5px;
`;
let CustomTableRow;
CustomTableRow = styled(TableRow)`
  ${CustomTableRow}:nth-child(odd) {
    background:rgba(252, 248, 232, 0.8);
  }
`;

class Globalstats extends Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    let country_stats = await track.countries(null, "cases");
    this.setState({
      data: [...this.state.data, ...country_stats],
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
                {this.state.data.map((row) => (
                  <CustomTableRow key={row.country}>
                    <CustomTableCell>
                      <Countrydiv>
                        <Avatar
                          variant="circle"
                          src={row.countryInfo.flag}
                        ></Avatar>
                        <p
                          style={{
                            marginLeft: "25px",
                            marginBottom: "-3px",
                            fontWeight: "bold",
                          }}
                          className="para"
                        >
                          <Link
                            to={`/country/${row.country}`}
                            className="para link"
                          >
                            {" "}
                            {row.country}{" "}
                          </Link>
                        </p>
                      </Countrydiv>
                    </CustomTableCell>
                    <CustomTableCell>
                      <p className="para">{row.cases.toLocaleString()}</p>
                    </CustomTableCell>
                    <CustomTableCell>
                      <p className="para">+{row.todayCases.toLocaleString()}</p>
                    </CustomTableCell>
                    <CustomTableCell>
                      <p className="para">{row.deaths.toLocaleString()}</p>
                    </CustomTableCell>
                    <CustomTableCell
                      style={{ backgroundColor: "rgba(232, 90, 79, 0.5)" }}
                    >
                      <p className="para">
                        +{row.todayDeaths.toLocaleString()}
                      </p>
                    </CustomTableCell>
                    <CustomTableCell
                      style={{ backgroundColor: "rgba(46, 213, 115, 0.5)" }}
                    >
                      <p className="para">{row.recovered.toLocaleString()}</p>
                    </CustomTableCell>
                    <CustomTableCell>
                      <p className="para">{row.active.toLocaleString()}</p>
                    </CustomTableCell>
                    <CustomTableCell
                      style={{ backgroundColor: "rgba(247, 158, 2, 0.5)" }}
                    >
                      <p className="para">{row.critical.toLocaleString()}</p>
                    </CustomTableCell>
                    <CustomTableCell>
                      <p className="para">
                        {row.casesPerOneMillion.toLocaleString()}
                      </p>
                    </CustomTableCell>
                    <CustomTableCell>
                      <p className="para">
                        {row.deathsPerOneMillion.toLocaleString()}
                      </p>
                    </CustomTableCell>
                  </CustomTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Styleddiv>
      </div>
    );
  }
}

export default Globalstats;
