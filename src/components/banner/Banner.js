import React from 'react';
import styled from 'styled-components';
import bgimg from './19.png';
import bgimg2 from './corona.png';

const Styleddiv = styled.div`
  background: url('${bgimg}');
  background-color: white;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: top;
  background-size: contain;
  height: 500px;
  @media (max-width: 768px) {
    height: 280px;
    background: url('${bgimg2}');
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;
  }
`;
export default function Bgimg() {
  
  return (
    <Styleddiv>
    </Styleddiv>
  );
}
