import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from "@material-ui/core/Grid";
import styled from 'styled-components';

const Styleddiv = styled.div`
    margin: 25px 50px;
`;

export default function G_loader() {
  const items = [];
    items.push(
    <Grid item lg={12} md={12} sm={12} xs={12} key={1}>
      <Skeleton width="100%"  height={45}/>
      <Skeleton width="90%"  height={45}/>
      <Skeleton width="100%"  height={45}/>
      <Skeleton width="90%"  height={45}/>
    </Grid>
    );
  return (
    <Styleddiv>
      <Grid container spacing={6} id="myList">
        {items}
      </Grid>
    </Styleddiv>
  );
}
