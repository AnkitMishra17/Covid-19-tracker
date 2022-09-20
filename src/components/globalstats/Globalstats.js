import React, { Component } from "react";
import { Link } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import TablePagination from '@material-ui/core/TablePagination';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import styled from "styled-components";
import { fetchCountries } from "../../static/app.api";
import { formatNumber, formatKey } from "../../utils/formatting";
import "./globalStats.css";

const Styleddiv = styled.div`
  margin: 40px 120px;
  box-shadow: -10px -10px 30px 2px rgba(0, 0, 0, 0.1);
  @media (max-width: 900px) {
    margin: 10px 20px;
  }
`;

const StyledHeaderdiv = styled.div`
  margin: 40px 120px;
  display: flex;
  align-items: end;
  justify-content: space-between;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
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
    background: rgba(252, 248, 232, 0.8);
  }
`;

class Globalstats extends Component {
  state = {
    data: [],
    sortValues: [],
    defaultSort: "cases",
    fetchCount: 0,
    page: 0,
    rowsPerPage: 10
  };

  componentDidMount() {
    this.fetchCountryData(this.state.defaultSort);
  }

  async fetchCountryData(sortKey) {
    let country_stats = await fetch(`${fetchCountries}?sort=${sortKey}`);
    country_stats.json().then((data) => {
      if (!this.state.fetchCount) this.mapDropDownData(data[0]);
      this.setState((prevState) => ({
        data,
        fetchCount: prevState.fetchCount + 1,
      }));
    });
  }

  mapDropDownData = (data) => {
    let selectData = [];
    for (let key in data) {
      selectData = [...selectData, { value: key, label: formatKey(key) }];
    }
    this.setState({
      sortValues: selectData,
    });
  };

  handleChange = (e) => {
    let sortKey = e.target.value;
    this.setState({
      defaultSort: sortKey,
    });
    this.fetchCountryData(sortKey);
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      page: 0,
      rowsPerPage: parseInt(event.target.value, 10)
    });
  };
  render() {
    return (
      <div>
        <StyledHeaderdiv>
          <div>
          <h1 className="headerText">
            <span role="img" aria-label="emoji">
              🌎
            </span>{" "}
            Country Breakdown
          </h1></div>
          <div>
            <FormControl variant="outlined" style={{ width: "250px" }}>
              <InputLabel id="demo-simple-select-outlined-label">
                Sort By
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={this.handleChange}
                value={this.state.defaultSort}
                className="para"
                label="Sort By"
              >
                {this.state.sortValues.map((data) => (
                  <MenuItem key={data.value} value={data.value} className="para">
                    {data.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </StyledHeaderdiv>
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
                {this.state.data.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => (
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
                      <p className="para">{formatNumber(row.cases)}</p>
                    </CustomTableCell>
                    <CustomTableCell>
                      <p className="para">+{formatNumber(row.todayCases)}</p>
                    </CustomTableCell>
                    <CustomTableCell>
                      <p className="para">{formatNumber(row.deaths)}</p>
                    </CustomTableCell>
                    <CustomTableCell
                      style={{ backgroundColor: "rgba(232, 90, 79, 0.5)" }}
                    >
                      <p className="para">+{formatNumber(row.todayDeaths)}</p>
                    </CustomTableCell>
                    <CustomTableCell
                      style={{ backgroundColor: "rgba(46, 213, 115, 0.5)" }}
                    >
                      <p className="para">{formatNumber(row.recovered)}</p>
                    </CustomTableCell>
                    <CustomTableCell>
                      <p className="para">{formatNumber(row.active)}</p>
                    </CustomTableCell>
                    <CustomTableCell
                      style={{ backgroundColor: "rgba(247, 158, 2, 0.5)" }}
                    >
                      <p className="para">{formatNumber(row.critical)}</p>
                    </CustomTableCell>
                    <CustomTableCell>
                      <p className="para">
                        {formatNumber(row.casesPerOneMillion)}
                      </p>
                    </CustomTableCell>
                    <CustomTableCell>
                      <p className="para">
                        {formatNumber(row.deathsPerOneMillion)}
                      </p>
                    </CustomTableCell>
                  </CustomTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={this.state.data.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        </Styleddiv>
      </div>
    );
  }
}

export default Globalstats;
