/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { light, nutrients, temp, water } from "asset/index";

export default function StatusBlock() {
  function progressBar(stat) {
    let progress;
    if (stat === "low") {
      progress = css`
        width: 30%;
        background-color: #1072e2;
      `;
    }
    if (stat === "normal") {
      progress = css`
        width: 60%;
        background-color: #11c75e;
      `;
    } else if (stat === "high") {
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
        {liBox(light, "빛", "딱 좋아요", "normal")}
        {liBox(temp, "온도", "흡족해요", "low")}
        {liBox(water, "수분", "적당해요", "high")}
        {liBox(nutrients, "영양", "만족해요", "normal")}
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
