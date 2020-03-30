import React, {Component} from 'react';
import styled from 'styled-components';
let covid = require('novelcovid');

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
          <div>
          </div>
      )
  }
}


export default Globalstats;
