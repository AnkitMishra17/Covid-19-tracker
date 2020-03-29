import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from "@material-ui/core/Grid";
import styled from 'styled-components';

const Styleddiv = styled.div`
    margin: 25px 50px;
`;

export default function Loader() {
  
  return (
    <Styleddiv>
      <Grid container spacing={6} id="myList">
        <Grid item xs={12} sm={6} md={3}>
          <Skeleton variant="rect" width="90%" height={118} />
          <Skeleton width="90%"/>
          <Skeleton width="60%" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Skeleton variant="rect" width="90%" height={118} />
          <Skeleton width="90%"/>
          <Skeleton width="60%" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Skeleton variant="rect" width="90%" height={118} />
          <Skeleton width="90%"/>
          <Skeleton width="60%" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Skeleton variant="rect" width="90%" height={118} />
          <Skeleton width="90%"/>
          <Skeleton width="60%" />
        </Grid>
      </Grid>
    </Styleddiv>
  );
}
