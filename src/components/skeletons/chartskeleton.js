import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import styled from 'styled-components';

const Styleddiv = styled.div`
  border-radius: 5px;
  box-shadow: -10px -10px 20px 4px rgba(0, 0, 0, 0.1);
  z-index: -10;
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

export default function Chartloader() {
  return (
    <Styleddiv>
      <CustomCard>
        <CardActionArea>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs>
                <Typo gutterBottom variant="h5" component="h2">
                    <Skeleton width="50%"  height={50}/>
                    <Skeleton variant="rect" width={210} height={360} />
                </Typo>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </CustomCard>
    </Styleddiv>
  );
}
