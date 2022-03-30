/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function CharacterBlock() {
  const nickName = "뽀둥이";
  return (
    <>
      <div css={characterBlock}>
        <img
          alt="캐릭터 이미지"
          css={gifFrame}
          src={require("asset/Default.png")}
        />
      </div>
      <div css={nicknameBlock}>{nickName}</div>
      <div css={statusMessage}>
        <p>{nickName}는 지금 건강해요!</p>
        <p>쾌적한 날씨에 기분이 아주 좋은 상태네요.</p>
      </div>
    </>
  );
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
