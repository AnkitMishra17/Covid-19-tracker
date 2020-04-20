import React from "react";
import { Pie, Doughnut } from "react-chartjs-2";
import styled from "styled-components";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const Relativediv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius:5px;
  border-top: 5px solid #263560;
  align-items: center;
  margin: 10px;
  width: 100%;
  box-shadow: -10px -10px 30px 2px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
  padding: 50px;
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
    <Relativediv style={{ height: "400px" }}>
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
