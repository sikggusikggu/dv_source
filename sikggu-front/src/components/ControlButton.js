/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

function ControlButton() {
  const [motorStat, setMoterStat] = useState(false);
  const [lightStat, setLightStat] = useState(false);

  function controlMoter() {
    if (motorStat) {
      setMoterStat(false);
      fetch("http://heom.duckdns.org/moterOff")
        .then((res) => res.text())
        .then((result) => {
          if (result.success) {
            console.log(result);
          }
        });
    } else {
      setMoterStat(true);
      fetch("http://heom.duckdns.org/moterOn")
        .then((res) => res.text())
        .then((result) => {
          if (result.success) {
            console.log(result);
          }
        });
    }
  }

  function controlLight() {
    if (lightStat) {
      setLightStat(false);
      fetch("http://heom.duckdns.org/lightOff")
        .then((res) => res.text())
        .then((res) => {
          if (res.success) {
            console.log(`${res}`);
          }
        });
    } else {
      setLightStat(true);
      fetch("http://heom.duckdns.org/lightOn")
        .then((res) => res.text())
        .then((res) => {
          if (res.success) {
            console.log(`${res}`);
          }
        });
    }
  }

  return (
    <div css={container}>
      <button
        type="button"
        css={[moterButton, waterButton]}
        onClick={controlMoter}
      >
        물 주기
      </button>
      <button
        type="button"
        css={[moterButton, lightButton]}
        onClick={controlLight}
      >
        빛 주기
      </button>
    </div>
  );
}

export default ControlButton;

const container = css`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 10rem;
  margin: 2rem auto 0;
`;

const moterButton = css`
  width: 50%;
  text-align: center;
  font-size: 1rem;
  &:hover {
    color: #0617d4;
  }
`;

const waterButton = css`
  &:hover {
    color: #0617d4;
  }
`;

const lightButton = css`
  &:hover {
    color: #d43306;
  }
`;
