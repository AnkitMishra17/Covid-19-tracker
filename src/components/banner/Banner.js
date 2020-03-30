import React from 'react';
import bgimg from './coronavirus.jpg';

const bgstyle={
    background: `url(${bgimg})`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '500px'
};

export default function Bgimg() {
  
  return (
    <div style={bgstyle}>
    </div>
  );
}
