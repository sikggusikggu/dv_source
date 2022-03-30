/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function Header() {
  return (
    <div css={header}>
      <div css={logo}>식꾸식꾸</div>
    </div>
  );
}

const header = css`
  width: 100%;
  padding: 1rem;
  margin: 0 auto;
  box-sizing: border-box;
`;

const logo = css`
  text-align: center;
  font-family: Black Han Sans;
  font-size: 2rem;
  line-height: 2rem;
  padding-top: 0.2rem;
`;
