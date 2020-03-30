import React from 'react';
import styled from 'styled-components';
import bgimg from './coronavirus.jpg';
import bgimg2 from './corona.png';

const Styleddiv = styled.div`
  background: url('${bgimg}');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  height: 500px;
  @media (max-width: 768px) {
    height: 280px;
    background: url('${bgimg2}');
    background-size: contain;
  }
`;
export default function Bgimg() {
  
  return (
    <Styleddiv>
    </Styleddiv>
  );
}
