/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import CharacterBlock from "components/CharacterBlock";
import ControlButton from "components/ControlButton";
import Header from "components/Header";
import Navigate from "components/Navigate";
import StatusBlock from "components/StatusBlock";

function MainPage() {
  const nickName = "뽀둥이";

  return (
    <div css={defaultFrame}>
      {/* <div css={styleGuide} /> */}
      <Header />
      <CharacterBlock nickName={nickName} />
      <ControlButton />
      <StatusBlock />
      {/* <div css={calenderBlock}>식꾸식꾸 달력 블록</div> */}
    </div>
  );
}

const defaultFrame = css`
  width: 396px;
  margin: 0 auto;
  background-color: rgba(207, 250, 247, 0.51);
`;

// const styleGuide = css`
//   position: absolute;
//   width: 198px;
//   height: 100%;
//   border: solid red 2px;
// `;

// const calenderBlock = css`
//   width: 100%;
//   height: 400px;
//   background-color: black;
// `;

export default MainPage;
