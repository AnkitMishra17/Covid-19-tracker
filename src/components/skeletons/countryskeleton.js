import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import styled from 'styled-components';

const Styleddiv = styled.div`
  position: absolute;
  border-radius: 5px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: -10px -10px 20px 4px rgba(0, 0, 0, 0.1);
  z-index: -10;
  @media (max-width: 768px) {
    top: 85%;
    width: 90%;
  }
`;

const StyledPaper = styled(Paper)`
  padding:10px;
  max-height:120px;
`;

const Typo = styled(Typography)`
  font-family: "Hind", sans-serif;
  font-size: 36px;
  font-weight: bold;
`;

const CustomCard = styled(Card)`
  width: 750px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default function countryloader() {
  return (
    <Styleddiv>
      <CustomCard>
        <CardActionArea>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs>
                <Typo gutterBottom variant="h5" component="h2">
                    <Skeleton width="50%"  height={50}/>
                    <Skeleton variant="rect" width={210} height={118} />
                </Typo>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <StyledPaper className="cases">
                    <Skeleton width="100%"  height={120}/>
                </StyledPaper>
              </Grid>
              <Grid item md={6} xs={12}>
                <StyledPaper className="deaths">
                    <Skeleton width="100%"  height={120}/>
                </StyledPaper>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <StyledPaper className="recover">
                    <Skeleton width="100%"  height={120}/>
                </StyledPaper>
              </Grid>
              <Grid item md={6} xs={12}>
                <StyledPaper className="active-cases">
                    <Skeleton width="100%"  height={120}/>
                </StyledPaper>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </CustomCard>
    </Styleddiv>
  );
}
