/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { light, nutrients, temp, water } from "asset/index";

export default function StatusBlock({ plantData }) {
  function makeMessage(how, _stat) {
    if (_stat === -1) {
      if (how === "light") return "어두워요";
      if (how === "temp") return "추워요";
      if (how === "water") return "목말라요";
      if (how === "nutrients") return "배고파요";
    } else if (_stat === 0) {
      if (how === "light") return "딱 좋아요";
      if (how === "temp") return "흡족해요";
      if (how === "water") return "적당해요";
      if (how === "nutrients") return "만족해요";
    } else {
      if (how === "light") return "눈부셔요";
      if (how === "temp") return "더워요";
      if (how === "water") return "과해요";
      if (how === "nutrients") return "배불러요";
    }
  }

  function progressBar(stat) {
    let progress;
    if (stat === -1) {
      progress = css`
        width: 30%;
        background-color: #1072e2;
      `;
    } else if (stat === 0) {
      progress = css`
        width: 60%;
        background-color: #11c75e;
      `;
    } else if (stat === 1) {
      progress = css`
        width: 100%;
        background-color: #ff2700;
      `;
    }
    return (
      <div css={progreeContainer}>
        <div css={[progreeBar, progress]} />
      </div>
    );
  }

  function liBox(imgName, labelName, message, stat) {
    return (
      <li css={liContentsBox}>
        <img css={liContentImg} src={imgName} alt="상태이미지" />
        <label css={liContentP} htmlFor={imgName}>
          <p>{labelName}</p>
        </label>
        {progressBar(stat)}
        <p css={stateMessage}>{message}</p>
      </li>
    );
  }

  return (
    <div css={statusBlock}>
      <div css={stateFont}>STATE</div>
      <ul css={listContainer}>
        {liBox(
          light,
          "빛",
          makeMessage("light", plantData.light),
          plantData.light
        )}
        {liBox(
          temp,
          "온도",
          makeMessage("temp", plantData.temp),
          plantData.temp
        )}
        {liBox(
          water,
          "수분",
          makeMessage("water", plantData.water),
          plantData.water
        )}
        {liBox(
          nutrients,
          "영양",
          makeMessage("nutrients", plantData.nutrients),
          plantData.nutrients
        )}
      </ul>
    </div>
  );
}

const statusBlock = css`
  width: 100%;
  padding: 8px 0;
`;

const stateFont = css`
  width: 20rem;
  margin: 1.3rem auto 0;
  text-align: left;
  font-size: 1.7rem;
  font-weight: 600;
`;

const listContainer = css`
  margin-top: -0.5rem;
`;

const liContentsBox = css`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 20rem;
  height: 3rem;
  margin: 1rem auto;
  border-radius: 1.5em;
  padding: 0.2rem 0.7rem;
  background-color: #fff;
`;

const liContentImg = css`
  position: relative;
  margin-right: 0.3rem;
  top: -0.15rem;
  width: 2.3rem;
`;

const liContentP = css`
  position: relative;
  top: 0.03rem;
  width: 1.8rem;
  margin-right: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
`;

const progreeContainer = css`
  width: 10rem;
  height: 1.2rem;
`;

const progreeBar = css`
  height: 1.2rem;
  border-radius: 30rem;
`;

const stateMessage = css`
  width: 5rem;
  font-size: 0.7rem;
  font-weight: 800;
  text-align: center;
`;
