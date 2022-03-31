/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";

function ControlButton() {
  const [motorStat, setMoterStat] = useState(false);
  const [lightStat, setLightStat] = useState(false);

  function controlMoter() {
    if (motorStat) {
      setMoterStat(false);
      const db = getDatabase();
      set(ref(db, "doit/moter"), {
        do: 0,
      });
    } else {
      setMoterStat(true);
      const db = getDatabase();
      set(ref(db, "doit/moter"), {
        do: 1,
      });
    }
  }
  function controlLight() {
    if (lightStat) {
      setLightStat(false);
      const db = getDatabase();
      set(ref(db, "doit/light"), {
        do: 0,
      });
    } else {
      setLightStat(true);
      const db = getDatabase();
      set(ref(db, "doit/light"), {
        do: 1,
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
      <Link css={moterButton} to="/Cummunity">
        자랑하기
      </Link>
    </div>
  );
}

export default ControlButton;

const container = css`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 18rem;
  margin: 2rem auto 0;
`;

const moterButton = css`
  width: 70%;
  text-align: center;
  font-size: 1rem;
  &:hover {
    color: #adadad;
  }
`;

const waterButton = css`
  &:hover {
    color: #adadad;
  }
`;

const lightButton = css`
  &:hover {
    color: #adadad;
  }
`;
