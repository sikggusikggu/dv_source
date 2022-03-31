/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function CharacterBlock({ nickName, plantData }) {
  function divBox(img, msg1, msg2) {
    return (
      <>
        <div css={characterBlock}>
          <img alt="캐릭터 이미지" css={gifFrame} src={img} />
        </div>
        <div css={nicknameBlock}>{nickName}</div>
        <div css={statusMessage}>
          <p>{msg1}</p>
          <p>{msg2}</p>
        </div>
      </>
    );
  }

  function classifyPlantMode() {
    if (plantData.light === -1) {
      return divBox(
        require("asset/lowLight.png"),
        `${nickName}가 그늘에 너무 오래 있었어요.`,
        `어서 햇빛을 보여주세요.`
      );
    } else if (plantData.temp === 1) {
      return divBox(
        require("asset/highTemp.png"),
        `${nickName}가 더워하고 있어요!`,
        `신선한 곳으로 데려가 주세요.`
      );
    } else if (plantData.water === 1) {
      return divBox(
        require("asset/highWater.png"),
        `너무 축축해서 곰팡이가 괴롭히네요.`,
        `${nickName}가 건조해질 수 있게 해주세요.`
      );
    } else if (plantData.nutrients === -1) {
      return divBox(
        require("asset/lowNut.png"),
        `${nickName}가 배가 고파요.`,
        `영양실조에 걸리지 않게 영양을 챙겨주세요.`
      );
    } else {
      return divBox(
        require("asset/Default.png"),
        `${nickName}는 지금 건강해요!`,
        `쾌적한 날씨에 기분이 아주 좋은 상태네요.`
      );
    }
  }

  return <>{classifyPlantMode()}</>;
}

const characterBlock = css`
  width: 18rem;
  height: 18rem;
  background-color: #fff;
  border-radius: 50%;
  margin: 0 auto;
`;

const nicknameBlock = css`
  width: 100%;
  height: 30px;
  padding: 0.5rem;
  line-height: 30px;
  margin: 0 auto 1rem auto;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
`;

const gifFrame = css`
  width: 18rem;
  margin: 0 auto;
  display: block;
`;

const statusMessage = css`
  width: 20rem;
  margin: 0 auto;
  padding: 1rem;
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  border-radius: 1rem;
  background-color: #fff;
  text-align: center;
`;
