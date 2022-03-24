/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function CharacterBlock() {
  return (
    <div css={characterBlock}>
      <div css={nicknameBlock}>나의 귀요미 식물</div>
      <img
        alt="캐릭터 이미지"
        css={gifFrame}
        src="https://blog.kakaocdn.net/dn/c6pAkf/btrn4rgw5la/7m06GPUMq1155ou7EEYo21/img.gif"
      />
      <div css={statusMessage}>
        <p>나의 귀요미 식물이 너무 더워요!</p>
        <p>나의 귀요미 식물이 갈증을 느끼고 있어요!</p>
      </div>
    </div>
  );
}

const characterBlock = css`
  width: 100%;
  background-color: #efefef;
`;

const nicknameBlock = css`
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding-left: 5px;
  font-weight: bold;
  font-size: 15px;
`;

const gifFrame = css`
  width: 100%;
  display: block;
`;

const statusMessage = css`
  font-size: 13px;
  line-height: 20px;
  padding-left: 5px;
`;
