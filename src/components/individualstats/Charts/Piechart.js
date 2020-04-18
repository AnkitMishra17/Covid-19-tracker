import React from "react";
import { Pie, Doughnut } from "react-chartjs-2";
import styled from "styled-components";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const Relativediv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 50px;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export default function Piechart(props) {
  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  return (
    <Relativediv style={{ height: "360px", marginBottom: "50px" }}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label={checked ? "Piechart Mode" : "Doughnut Mode"}
      />
      {checked ? (
        <Pie data={props.pieData} options={{ maintainAspectRatio: false }} />
      ) : (
        <Doughnut
          data={props.pieData}
          options={{ maintainAspectRatio: false }}
        />
      )}
    </Relativediv>
  );
}
