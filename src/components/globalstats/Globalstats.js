import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';
let covid = require('novelcovid');

const Styleddiv = styled.div`
    margin: 25px 50px;
    box-shadow: -10px -10px 30px 4px rgba(0,0,0,0.1);
    @media (max-width: 768px) {
      margin: 15px 30px;
    }
`;

const Countrydiv = styled.div`
    display: flex;
    flex-direction: row;
    font-family: 'Hind', sans-serif;
`;

class Globalstats extends Component {
  
  state = {
    data: []
  }


  async componentDidMount(){
    let country_stats = await covid.getCountry();
    this.setState({
      data: [ ...this.state.data, ...country_stats ]
    });
    console.log(this.state.data[0]);
  }
  
  render() {
    
    return (
      <Styleddiv>
        <TableContainer component={Paper}>
          <Table stickyHeader size="small" aria-label="a dense table">
            <TableHead>
              <TableRow  style={{padding:'50px'}}>
                <TableCell >Country</TableCell>
                <TableCell >Cases</TableCell>
                <TableCell >New Cases</TableCell>
                <TableCell >Deaths</TableCell>
                <TableCell >New Deaths</TableCell>
                <TableCell >Recovered</TableCell>
                <TableCell >Active Cases</TableCell>
                <TableCell >Critical</TableCell>
                <TableCell >DOPM</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map((row) => (
                <TableRow key={row.country}>
                  <TableCell component="th" scope="row" align="right">   
                    <Countrydiv>
                      <Avatar variant="square" src={row.countryInfo.flag} style={{height:'30px',borderRadius:'6px'}}>
                      </Avatar>
                      <p style={{marginLeft:'25px',marginBottom:'-3px', fontWeight:'bold'}}>{row.country}</p>
                    </Countrydiv>
                  </TableCell>
                  <TableCell >{row.cases}</TableCell>
                  <TableCell>+{row.todayCases}</TableCell>
                  <TableCell>{row.deaths}</TableCell>
                  <TableCell style={{color:'#E85A4F'}}>+{row.todayDeaths}</TableCell>
                  <TableCell style={{color:'#86C232'}}>{row.recovered}</TableCell>
                  <TableCell>{row.active}</TableCell>
                  <TableCell>{row.critical}</TableCell>
                  <TableCell>{row.deathsPerOneMillion}</TableCell>
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
